// app/work/[slug]/page.tsx
import { notFound } from "next/navigation";
import Navbar from "@/components/Home/Navbar/Navbar";
import Footer from "@/components/Home/Footer/Footer";
import WorkDetailHeader from "@/components/work-detail/Workdetailheader";
import WorkDetailInfo from "@/components/work-detail/Workdetailinfo";
import WorkImageLayout from "@/components/work-detail/Workimagelayout";
import { workDetails, getWorkBySlug } from "@/components/work-detail/work-detail-data";

interface WorkDetailsProps {
  params: Promise<{ slug: string }>;
}

// Pre-render one page per work at build time
export function generateStaticParams() {
  return workDetails.map((work) => ({ slug: work.slug }));
}

// Optional: dynamic <title>/meta per work
export async function generateMetadata({ params }: WorkDetailsProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) return {};

  return {
    title: `${work.title} — Work`,
    description: work.overview,
  };
}

export default async function WorkDetails({ params }: WorkDetailsProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <section className="bg-black">
      <Navbar />
      <WorkDetailHeader work={work} />
      <WorkImageLayout images={work.images} alt={work.title} />
      <WorkDetailInfo work={work} />
      <Footer />
    </section>
  );
}