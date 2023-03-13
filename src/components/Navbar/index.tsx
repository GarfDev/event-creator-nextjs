import Image from "next/image";

import SupermomosLogo from "../../../public/supermomos-logo.png";
import { Routes, Route } from "./styles";
import { PATHS } from "./constants";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {

  const router = useRouter();

  return (
    <nav className="absolute top-0 w-full flex justify-between items-center px-[var(--layout-padding)] py-[22px]">
      <Image
        src={SupermomosLogo.src}
        alt="supermomos-logo"
        width={200}
        height={35}
      />

      <Routes className="text-base">
        {Object.keys(PATHS).map((pathName) => (
          <Route className={router.asPath.includes(PATHS[pathName]) ? 'active' : ''} key={pathName}>
            <Link href={PATHS[pathName]}>{pathName}</Link>
          </Route>
        ))}
      </Routes>
    </nav>
  );
};

export default Navbar;
