"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

interface FooterLink { id: number; url: string; newTab: boolean; text: string; social?: string; }
interface CategoryLink { id: string; attributes: { name: string; slug: string } }

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "WEBSITE": return <CgWebsite />;
    case "TWITTER": return <AiFillTwitterCircle />;
    case "YOUTUBE": return <AiFillYoutube />;
    case "DISCORD": return <FaDiscord />;
    default: return null;
  }
}

export default function Footer({ logoUrl, logoText, menuLinks, categoryLinks, legalLinks, socialLinks }: {
  logoUrl: string | null; logoText: string | null;
  menuLinks: Array<FooterLink>; categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>; socialLinks: Array<FooterLink>;
}) {
  return (
    <footer className="sci-footer">
      <div className="sci-footer__inner">
        <div className="sci-footer__logo">{logoText || "Modern Polymath"}<em>.</em></div>
        <p className="sci-footer__tagline">Ideas at the intersection of science, design, and technology.</p>

        <div className="sci-footer__grid">
          {categoryLinks.length > 0 && (
            <div>
              <div className="sci-footer__col-title">Categories</div>
              {categoryLinks.map((link: CategoryLink) => (
                <Link key={link.id} href={`/en/${link.attributes.slug}`} className="sci-footer__col-link">
                  {link.attributes.name}
                </Link>
              ))}
            </div>
          )}
          {menuLinks.length > 0 && (
            <div>
              <div className="sci-footer__col-title">Menu</div>
              {menuLinks.map((link: FooterLink) => (
                <Link key={link.id} href={link.url} className="sci-footer__col-link" target={link.newTab ? "_blank" : undefined}>
                  {link.text}
                </Link>
              ))}
            </div>
          )}
          <div>
            <div className="sci-footer__col-title">Legal</div>
            {legalLinks.map((link: FooterLink) => (
              <Link key={link.id} href={link.url} className="sci-footer__col-link" target={link.newTab ? "_blank" : undefined}>
                {link.text}
              </Link>
            ))}
          </div>
        </div>

        <div className="sci-footer__bottom">
          <span>© {new Date().getFullYear()} {logoText || "Modern Polymath"}. All rights reserved.</span>
          <div className="sci-footer__social">
            {socialLinks.map((link: FooterLink) => (
              <a key={link.id} href={link.url} title={link.text} target={link.newTab ? "_blank" : "_self"} rel="noopener noreferrer" className="sci-footer__social-btn">
                <RenderSocialIcon social={link.social} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
