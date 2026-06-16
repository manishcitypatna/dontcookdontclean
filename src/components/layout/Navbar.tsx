import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6">
      <div className="container flex items-center justify-between">

        {/* Logo - left */}
        <Link href="/" className="relative w-[120px] h-[70px] flex-shrink-0">
          <Image
            src="/images/nav-logo.avif"
            alt="Don't Cook Don't Clean"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Nav pill - right */}
        <nav className="flex items-center gap-4 bg-[#f2d701]/20 backdrop-blur-xl rounded-full px-8 shadow-lg h-[58px]">
          {["Home", "About", "Contact", "Blog"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : item === "About" ? "/#about" : item === "Contact" ? "/#contact" : "/blog"}
              className="text-text-primary font-semibold text-lg hover:text-primary transition-colors duration-300 relative group whitespace-nowrap"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}
