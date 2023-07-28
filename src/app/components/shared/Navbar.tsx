import { Icons } from './Icons';
import ImageForm from '../Forms/Create/ImageForm';
import SearchForm from '../Forms/Search/SearchForm';

const Navbar = () => {
  return (
    <nav className="z-10 backdrop-blur-md sticky top-0 w-full h-20 bg-white/90 p-6 flex justify-between items-center gap-2 md:gap-8 shadow-md">
      <div className="flex gap-10 items-center">
        <Icons.logo size={40} className="text-primary hover:animate-bounce" />
        <div className="flex-col text-center hidden md:flex">
          <p className="text-base font-medium text-frogBlack ">
            Frog<span className="text-primary font-bold">Splash</span>
          </p>
          <p className="text-frogGrey text-xs">DevChallgenes.io</p>
        </div>
        <SearchForm />
      </div>

      <ImageForm />
    </nav>
  );
};

export default Navbar;
