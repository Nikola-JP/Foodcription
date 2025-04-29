function Footer() {
  return (
    <footer className="bg-green-600 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm">
          <a href="/" className="hover:underline">
            Povratak na landing page
          </a>
        </div>
        <div className="text-sm mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Coded by{" "}
          <span className="font-semibold">chase & darkimunus</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
