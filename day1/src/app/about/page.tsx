import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const About = () => {
  return (
    <>
      <section className="min-h-full flex flex-col items-center justify-center bg-white px-4 mt-5">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
          About Page
        </h1>
        <p className="text-lg text-black text-center w-1/2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum,
          molestias pariatur praesentium assumenda exercitationem recusandae
          unde labore, obcaecati nihil, modi impedit est quia enim! Ea, debitis
          sapiente. Libero, adipisci velit.
        </p>
        <Link href="/">
          <Button className="mt-4">Shadcn Button</Button>
        </Link>
      </section>
      <Card className="w-1/4 mx-auto mt-5">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default About;
