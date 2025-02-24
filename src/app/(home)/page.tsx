import { Hero } from "./_components/hero";
import { HeroImage } from "./_components/hero-image";

export default function Home() {
  return (
    <main className="w-full h-full">
      <div className="w-full h-[calc(100vh-120px)] overflow-hidden">
        <div className="container mx-auto px-4 2xl:px-0">
          <Hero />
        </div>
        <HeroImage />
      </div>
    </main>
  );
}
