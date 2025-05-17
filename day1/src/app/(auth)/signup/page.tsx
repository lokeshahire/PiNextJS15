"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignupResponse {
  message: string;
  user?: {
    name: string;
    role: string;
    id: string;
  };
}

export default function SignupPage() {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<"author" | "customer">("author");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSignup = async () => {
    setError(""); // Clear previous errors
    if (!name) {
      setError("Please enter  name ");
      return;
    }
    if (!["author", "customer"].includes(role)) {
      setError("Please select a valid role");
      return;
    }

    try {
      console.log("Signup attempt:", { name, role }); // Debug payload
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role }),
      });

      const data: SignupResponse & { message?: string } = await res.json();

      if (!res.ok) {
        console.log("Signup failed with response:", data);
        setError(data.message || "Signup failed");
        return;
      }

      router.push("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Signup</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        className="border p-2 mb-2 w-full"
      />

      <select
        value={role}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setRole(e.target.value as "author" | "customer")
        }
        className="border p-2 mb-4 w-full"
      >
        <option value="author">Author</option>
        <option value="customer">Customer</option>
      </select>
      <button
        onClick={handleSignup}
        className="bg-blue-600 text-white p-2 w-full"
      >
        Signup
      </button>
    </div>
  );
}
