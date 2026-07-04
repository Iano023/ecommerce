import { Link } from "react-router-dom";
import { Store, Github, Twitter, Instagram, Mail, Heart } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "Jeans", href: "/category/jeans" },
    { name: "T-Shirts", href: "/category/t-shirts" },
    { name: "Shoes", href: "/category/shoes" },
    { name: "Jackets", href: "/category/jackets" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Shipping Info", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative mt-auto">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      <div className="bg-surface-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 group mb-4">
                <div className="w-9 h-9 rounded-lg bg-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/30 transition-colors">
                  <Store className="w-5 h-5 text-brand-400" />
                </div>
                <span className="text-lg font-bold text-white">
                  EverGreen Store
                </span>
              </Link>
              <p className="text-surface-400 text-sm leading-relaxed max-w-xs">
                Discover the latest in eco-friendly fashion. Quality pieces that look
                good and do good for the planet.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-5">
                {[Twitter, Instagram, Github].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-surface-800 hover:bg-surface-700 flex items-center justify-center text-surface-400 hover:text-white transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-surface-400 hover:text-brand-400 transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-surface-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-surface-500">
                &copy; 2025 EverGreen Store. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
