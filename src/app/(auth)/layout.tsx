"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: LayoutProps) => {
  const pathName = usePathname();
  const isSignIn = pathName === "/sign-in";

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="logo.svg" alt="logo" width={152} height={56} />
          <Button asChild variant="secondary">
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "Sign Up" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col justify-center pt-4 md:pt-14 items-center">
          {children}
        </div>
      </div>
    </main>
  );
};
export default AuthLayout;
