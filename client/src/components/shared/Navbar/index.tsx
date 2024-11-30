import { Link } from "react-router-dom";
import NavbarActions from "./Actions";
import Search from "./Search";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-20 py-6 bg-white md:py-10">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-x-4 md:gap-x-8 lg:gap-x-16">
          <h1 className="text-[24px] md:text-[32px] font-bold text-primary leading-[36px] md:leading-[48px]">
            <Link to={"/"}>MORENT</Link>
          </h1>
          <Search />
        </div>
        <NavbarActions />
      </div>
    </div>
  );
};

export default Navbar;
