import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Project from "@/components/Project";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import About from "@/components/About";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Project />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
