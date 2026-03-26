import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Projects from "@/components/home/Projects";
import ActivityDashboard from "@/components/activity/ActivityDashboard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />

      <ActivityDashboard />

      <footer className="py-8 border-t border-neutral-800 text-center text-text-secondary text-sm">
        <p>© {new Date().getFullYear()} Althaf Kumara Website.</p>
      </footer>
    </div>
  );
}
