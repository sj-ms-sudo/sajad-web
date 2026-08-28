"use client";

import { useState } from "react";
import ScrollExperience, { type Section } from "@/components/ScrollExperience";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

const sections: Section[] = [
  { id: "hero", label: "Home", render: (p) => <Hero {...p} /> },
  { id: "work", label: "Work", render: (p) => <SelectedWork {...p} /> },
  { id: "about", label: "About", render: (p) => <About {...p} /> },
  { id: "services", label: "Services", render: (p) => <Services {...p} /> },
  { id: "contact", label: "Contact", render: (p) => <Contact {...p} /> },
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onFinish={() => setLoading(false)} />;
  }

  return <ScrollExperience sections={sections} header={<Header />} />;
}