import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SearchBar } from "../components/SearchBar";
import { Header } from "../components/Header";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <div className="min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};
