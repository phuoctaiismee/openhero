import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Hero from "@/components/sections/Hero";
import HeroGallery from "@/components/sections/HeroGallery";
import { getVideoCatalog } from "@/lib/videos";

export default function Home() {
  const { videos, categories } = getVideoCatalog();
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div 
        className="absolute inset-0 -z-10"
        style={{ 
          backgroundImage: "url('/svg/hero-background2.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition: "-500px -100px" 
        }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <HeroGallery videos={videos} categories={categories} />
      </main>
      <Footer />
    </div>
  );
}
