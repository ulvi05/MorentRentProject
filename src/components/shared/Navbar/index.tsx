import NavbarActions from "./Actions";
import Search from "./Search";

const Navbar = () => {
  return (
    <div className="py-6 bg-white md:py-10">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-x-4 md:gap-x-8 lg:gap-x-16">
          <h1 className="text-[24px] md:text-[32px] font-bold text-primary-500 leading-[36px] md:leading-[48px]">
            MORENT
          </h1>
          <Search />
        </div>
        <NavbarActions />
      </div>
    </div>
  );
};

export default Navbar;
