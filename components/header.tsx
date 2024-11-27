// only to be shown for authenticated users

import Link from "next/link";
import { UserCircleIcon as SolidUserCircleIcon} from "@heroicons/react/16/solid";

import { Button } from "@nextui-org/react";
import { buttonClasses } from "@/utils/classes";
import LogOutButton from "./logout-button";

const Header = async () => {
  
  const user = "dummy"
  const username = "dummy"

  return (
    <header className="flex text-foreground p-2 sticky top-0 border-b-2 bg-background border-t-gray-300 gap-1 z-10 md:p-6">
      <nav className="container flex items-center justify-between">
        <ul>
          <li>
            <Link className="uppercase font-bold text-medium" href="/">Blomster</Link>
          </li>
        </ul>
      </nav>
      {user ? (
        <>
          <LogOutButton />
          <Link href={"/create"} className="self-center">
            <Button className={buttonClasses}>Create post</Button>
          </Link>
          <div className="mx-2">
            <h3 className="text-small uppercase font-semibold text-primary dark:text-foreground">{username}</h3>
            <SolidUserCircleIcon className="text-primary dark:text-foreground" />
          </div>
        </>
      ) : (
        <Link href={"/auth/log-in"}>
          <Button className={buttonClasses}>Log in</Button>
        </Link>
      )}
    </header>
  );
};

export default Header;