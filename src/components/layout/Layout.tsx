import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchOverlay from "@/components/SearchOverlay";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onSearchClick={() => setSearchOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default Layout;
