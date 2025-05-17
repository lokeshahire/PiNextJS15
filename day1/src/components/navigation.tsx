"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");

  const syncAuthState = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUserRole(parsedUser.role);
      setUserName(parsedUser.name);
    } else {
      setIsLoggedIn(false);
      setUserRole("");
      setUserName("");
    }
  };

  useEffect(() => {
    syncAuthState(); // Initial state sync

    // Listen for login/logout events
    window.addEventListener("localStorageUpdate", syncAuthState);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("localStorageUpdate", syncAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Dispatch custom event
    window.dispatchEvent(new Event("localStorageUpdate"));

    setIsLoggedIn(false);
    setUserRole("");
    setUserName("");

    router.push("/login");
  };

  return (
    <nav className="flex justify-center items-center p-4 gap-4">
      <Link
        href="/"
        className={pathname === "/" ? "font-bold" : "text-blue-500"}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={pathname === "/about" ? "font-bold" : "text-blue-500"}
      >
        About
      </Link>
      <Link
        href="/blog"
        className={pathname === "/blog" ? "font-bold" : "text-blue-500"}
      >
        Blog
      </Link>

      {!isLoggedIn ? (
        <>
          <Link
            href="/login"
            className={pathname === "/login" ? "font-bold" : "text-blue-500"}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={pathname === "/signup" ? "font-bold" : "text-blue-500"}
          >
            Signup
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={handleLogout}
            className="text-red-500 border px-3 py-1 rounded hover:bg-red-100"
          >
            Logout
          </button>
          <span className="ml-2 text-white-600">
            Welcome, {`${userName} : ${userRole}`}
          </span>
        </>
      )}
    </nav>
  );
};
