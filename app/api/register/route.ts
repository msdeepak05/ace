import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/app/lib/mangodb";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");

  const existing = await users.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  await users.insertOne({ name, email, password: hashed });

  return NextResponse.json({ message: "Registered successfully" });
}