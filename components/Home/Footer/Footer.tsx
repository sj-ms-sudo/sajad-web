import LogoMark from '../logo/logomark';
import { navLinks } from '../Navbar/nav-links';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#030303] px-6 py-11">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
        <div className="flex flex-col gap-1">
          <span className="font-display text-base font-semibold tracking-wide text-[#edeff2]">
            <LogoMark/>
          </span>
          <p className="text-[12.5px] text-[#5b6270]">
            Full-stack engineer, offensive security enthusiast.
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-[#a3aab6] transition-colors hover:text-[#00e5ff]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span className="text-xs text-[#5b6270]">
          © {new Date().getFullYear()} Sajad Mashood A · Kannur, Kerala
        </span>
      </div>
    </footer>
  );
}