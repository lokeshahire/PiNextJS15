import Counter from "@/components/Counter";
import Greet from "@/components/Greet";

export default function Home() {
  return (
    <div className="grid grid-rows-[10px_1fr_10px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <h1>Lokesh Ahire</h1>
      <Greet />
      <Counter />
    </div>
  );
}
