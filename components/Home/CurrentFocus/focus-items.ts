export interface FocusItem {
  icon: 'shield' | 'search' | 'academy' | 'cpu';
  tag: string;
  title: string;
  description: string;
}

export const focusItems: FocusItem[] = [
  {
    icon: 'shield',
    tag: 'Security',
    title: 'Offensive security roadmap',
    description:
      'Working through Stages 0–11: web exploitation, network enumeration, AD attacks, binary exploitation, and cloud security.',
  },
  {
    icon: 'search',
    tag: 'AI/ML',
    title: 'face_cluster → smart visual search',
    description:
      'Evolving the face clustering engine with YOLOv8, CLIP embeddings, and image inpainting for smarter visual search.',
  },
  {
    icon: 'academy',
    tag: 'Product',
    title: 'Onverse Digital Academy',
    description:
      'Building out onverse.in end to end — SSR marketing site, curriculum, and the brand system behind it.',
  },
  {
    icon: 'cpu',
    tag: 'Low-level',
    title: 'Vulnerable C++ service',
    description:
      'A deliberately vulnerable network service with a documented exploit chain, from enumeration to privilege escalation.',
  },
];