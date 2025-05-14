"use client";
import { use, useState } from "react";

export default function Counter() {
  console.log("Counter component rendered");
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>Clicked {count} time</button>
  );
}
