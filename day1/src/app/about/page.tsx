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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
        <Button variant="lokesh" size="lg" className="mt-4">
          Variant Button
        </Button>
      </section>

      <section className="w-1/4 mx-auto mt-5">
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <Card className="my-5">
                <CardHeader>
                  <CardTitle>Card Title 1</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="my-5">
                <CardHeader>
                  <CardTitle>Card Title 2</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="my-5">
                <CardHeader>
                  <CardTitle>Card Title 3</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="my-5">
                <CardHeader>
                  <CardTitle>Card Title 4</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  );
};

export default About;
