import Hero from "@/src/components/Hero";
import Header from "@/src/components/Header";
import Project from "@/src/components/Project";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Project />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
