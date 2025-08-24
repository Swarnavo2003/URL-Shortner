import { ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <main className="overflow-hidden">
      <section className="relative">
        <div className="relative py-16 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="text-center sm:mx-auto sm:w-10/12 lg:mr-auto lg:mt-0 lg:w-4/5">
              <Link
                to="/"
                className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3"
              >
                <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">
                  New
                </span>
                <span className="text-sm">Introduction Clipr</span>
                <span className="bg-(--color-border) block h-4 w-px"></span>

                <ArrowRight className="size-4" />
              </Link>

              <h1 className="mt-8 text-4xl font-semibold md:text-5xl xl:text-5xl xl:[line-height:1.125]">
                Transform Long URLs <br /> Into Powerful Connections
              </h1>
              <p className="mx-auto mt-8 hidden max-w-2xl text-wrap text-lg sm:block">
                Create sleek, branded short links that build trust and boost
                clicks.
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-wrap sm:hidden">
                Simple, fast, and reliable link management for creators, teams,
                and businesses.
              </p>

              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link to="/dashboard/links">
                    <Rocket className="relative size-4" />
                    <span className="text-nowrap">Get Started</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
