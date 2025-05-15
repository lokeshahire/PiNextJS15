"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("author");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:8080/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
      }

      alert("Signup successful!");
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Signup</h1>
      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
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
