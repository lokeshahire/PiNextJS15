"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center items-center p-4">
      <Link
        href="/"
        className={pathname === "/" ? "font-bold mr-4" : "text-blue-500 mr-4"}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={
          pathname === "/about" ? "font-bold mr-4" : "text-blue-500 mr-4"
        }
      >
        About
      </Link>
      <Link
        href="/blog"
        className={
          pathname === "/blog" ? "font-bold mr-4" : "text-blue-500 mr-4"
        }
      >
        Blog
      </Link>
      <Link
        href="/login"
        className={
          pathname === "/login" ? "font-bold mr-4" : "text-blue-500 mr-4"
        }
      >
        Login
      </Link>
      <Link
        href="/signup"
        className={
          pathname === "/signup" ? "font-bold mr-4" : "text-blue-500 mr-4"
        }
      >
        Signup
      </Link>
    </nav>
  );
};
