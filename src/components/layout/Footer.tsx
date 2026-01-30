import { Link } from "react-router-dom";
import { categories } from "@/types/article";
import NewsletterSignup from "@/components/NewsletterSignup";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="font-display text-lg font-bold text-primary-foreground">AT</span>
              </div>
              <span className="font-display text-xl font-bold">AutoTechSpot</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Your trusted source for in-depth car reviews, automotive news, and expert insights. 
              Stay updated with the latest from the car world.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
              Categories
            </h3>
            <ul className="mt-4 space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Get the latest car reviews and news delivered to your inbox.
            </p>
            <NewsletterSignup className="mt-4" compact />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AutoTechSpot. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
