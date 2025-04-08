"use client";
import Link from "next/link";
import React from "react";
import { AlignJustify } from "lucide-react";
import { DashboardPages } from "@/utils/data";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import {
  SwitchThemBigScreen,
  SwitchThemSmallScreen,
} from "../themes/SwitchTheme";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AvatarUser from "../AvatarUser";
import { cn } from "@/lib/utils";
import DrawerProfile from "../home/DrawerProfile";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="w-full">
      <div
        className="px-4 py-5  max-w-7xl mx-auto flex items-center gap-6 justify-between
      transition-all duration-300 ease-in-out
      "
      >
        {/* first part (logo, and menu btn) */}
        <div className="flex items-center gap-3 transition-all duration-300 ease-in-out">
          {/* menu small screen */}
          <SmallScreenNavigation />
          {/* Logo */}
          <Link href={"/"}>
            <span className="text-lg font-bold tracking-tight text-[#ff9900]">
              SERVI Comics
            </span>
          </Link>
        </div>

        {/* second part (nav links)*/}
        <div className="hidden md:flex items-center gap-4 flex-1">
          {DashboardPages.map((lk, idx) => (
            <Link key={idx} href={lk.href}>
              <span
                className="text-sm font-medium tracking-wide hover:underline 
              hover:underline-offset-2
              transition-all duration-300 ease-in-out
              "
              >
                {lk.label}
              </span>
            </Link>
          ))}
        </div>

        {/* third part (user avatar and profile btn and theme switch) */}
        <div className="md:flex hidden items-center gap-3 transition-all duration-300 ease-in-out">
          {user ? (
            <DrawerProfile />
          ) : (
            <Button asChild>
              <Link href={"/connexion"} className="text-white px-8">
                Connexion
              </Link>
            </Button>
          )}

          {/* toggle theme */}
          <SwitchThemBigScreen />
        </div>
      </div>
    </header>
  );
};

export default Header;

const SmallScreenNavigation = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <AlignJustify size={24} />
      </SheetTrigger>
      <SheetContent
        className="overflow-x-hidden overflow-y-auto w-[90%] h-full
      transition-all duration-300 ease-in-out
      "
      >
        <SheetHeader className="border-b">
          <SheetTitle>SERVI Comics</SheetTitle>
          <SheetDescription>
            Lisez, publiez et trouvez des meilleurs mangas, webtoons et light
            novels.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 w-full px-4 flex-1 pb-4 border-b">
          {DashboardPages.map((lk, idx) => (
            <SheetClose key={idx} asChild>
              <Link href={lk.href}>
                <span
                  className="text-lg font-medium tracking-wide hover:underline 
              hover:underline-offset-2
              transition-all duration-300 ease-in-out
              "
                >
                  {lk.label}
                </span>
              </Link>
            </SheetClose>
          ))}

          {/* other links */}

          {user && (
            <>
              {/* <SheetClose asChild>
                <Link href={"/overview"}>
                  <span
                    className={`text-lg font-medium tracking-wide hover:underline 
              hover:underline-offset-2 text-[#ff9900]
              transition-all duration-300 ease-in-out
              `}
                  >
                    Dashboard
                  </span>
                </Link>
              </SheetClose> */}

              <SheetClose asChild>
                <Link href={"#"}>
                  <span
                    className="text-lg font-medium tracking-wide hover:underline 
              hover:underline-offset-2
              transition-all duration-300 ease-in-out
              "
                  >
                    Bookmark
                  </span>
                </Link>
              </SheetClose>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 justify-end px-4 py-4">
          {user ? (
            <SheetClose asChild>
              <Link
                href={"/profile"}
                className="flex w-full gap-4 items-center"
              >
                <AvatarUser />
                <div className="flex flex-col gap-0.5 flex-1 items-start justify-start">
                  <span className="text-sm font-medium tracking-wide capitalize">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              </Link>
            </SheetClose>
          ) : (
            <SheetClose asChild>
              <Button asChild>
                <Link href={"/connexion"} className={cn("text-white px-8")}>
                  Connexion
                </Link>
              </Button>
            </SheetClose>
          )}

          {/* toggle themes */}
          <SwitchThemSmallScreen />
        </div>
      </SheetContent>
    </Sheet>
  );
};
