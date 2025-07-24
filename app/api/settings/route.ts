import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import clientPromise from "@/app/lib/mangodb";

const configPath = path.join(process.cwd(), "app-config.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");
const defaultLogo = "/next.svg";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const settings = await db.collection("settings").findOne({});
    if (settings && settings.appName) {
      return NextResponse.json({
        appName: settings.appName,
        logo: settings.logo || defaultLogo,
      });
    }

    // Fallback to JSON file
    try {
      const data = await fs.readFile(configPath, "utf-8");
      const json = JSON.parse(data);
      if (json.appName) {
        await db.collection("settings").insertOne({
          appName: json.appName,
          logo: json.logo || defaultLogo,
        });
      }
      return NextResponse.json({
        appName: json.appName,
        logo: json.logo || defaultLogo,
      });
    } catch (err: any) {
      if (err.code === "ENOENT") {
        const defaultConfig = { appName: "AceHRMS", logo: defaultLogo };
        await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
        await db.collection("settings").insertOne(defaultConfig);
        return NextResponse.json(defaultConfig);
      }
      return NextResponse.json({ error: "Failed to read config" }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Failed to get settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Parse form data for file upload
  const formData = await req.formData();
  const appName = formData.get("appName") as string;
  const logoFile = formData.get("logo") as File | null;

  if (!appName) {
    return NextResponse.json({ error: "App name is required" }, { status: 400 });
  }

  let logoPath = defaultLogo;

  // Handle logo upload
  if (logoFile && logoFile.size > 0) {
    await fs.mkdir(uploadsDir, { recursive: true });
    const ext = path.extname(logoFile.name) || ".png";
    const fileName = `logo_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, fileName);
    const arrayBuffer = await logoFile.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));
    logoPath = `/uploads/${fileName}`;
  } else {
    // If no new logo uploaded, try to keep the old one
    const client = await clientPromise;
    const db = client.db();
    const current = await db.collection("settings").findOne({});
    if (current && current.logo) {
      logoPath = current.logo;
    }
  }

  // Save to DB
  const client = await clientPromise;
  const db = client.db();
  await db.collection("settings").deleteMany({});
  await db.collection("settings").insertOne({ appName, logo: logoPath });

  // Also update JSON file for fallback
  const newConfig = { appName, logo: logoPath };
  await fs.writeFile(configPath, JSON.stringify(newConfig, null, 2));
  return NextResponse.json(newConfig);
}