import Navbar from "@/components/Home/Navbar/Navbar"; // or wherever yours lives
import Footer from "@/components/Home/Footer/Footer";
import WorkDetailHeader from "@/components/work-detail/Workdetailheader";
import WorkDetailInfo from "@/components/work-detail/Workdetailinfo";
import WorkImageLayout from "@/components/work-detail/Workimagelayout";
import { sampleWorkDetail } from "@/components/work-detail/work-detail-data";

export default function WorkDetails() {
  const work = sampleWorkDetail;

  return (
    <>
      <Navbar />
      <WorkDetailHeader work={work} />
      <WorkImageLayout images={work.images} />
      <WorkDetailInfo work={work} />
      <Footer />
    </>
  );
}