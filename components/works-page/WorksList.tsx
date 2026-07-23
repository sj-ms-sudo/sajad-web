import WorkRow from './WorkRow';
import { worksPageData } from './works-data';

export default function WorksList() {
  return (
    <section className="bg-[#050505] pb-32">
      <div className="mx-auto max-w-6xl divide-y divide-white/[0.06] px-0">
        {worksPageData.map((work, i) => (
          <WorkRow key={work.title} work={work} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}