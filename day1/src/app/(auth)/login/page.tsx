"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  role: string;
  id: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export default function LoginPage() {
  const [name, setName] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [password, setPassword] = useState("pass123");

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data: LoginResponse & { message?: string } = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save user and token to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Notify other components
      window.dispatchEvent(new Event("localStorageUpdate"));

      router.push("/blog");
    } catch (error: any) {
      setError("An unexpected error occurred");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        value={password}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleLogin}
        className="bg-green-600 text-white p-2 w-full"
      >
        Login
      </button>
    </div>
  );
}
