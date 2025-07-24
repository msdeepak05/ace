export default function Footer() {
  return (
      <footer id="contact" className="w-full bg-white py-8 px-4 flex flex-col items-center border-t">
        <p className="text-indigo-400 text-sm">&copy; {new Date().getFullYear()} AceHRMS. All rights reserved.</p>
      </footer>
  );
}