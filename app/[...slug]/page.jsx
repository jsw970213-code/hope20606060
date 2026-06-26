import ShinilSite from '../ShinilSite';

export function generateStaticParams() {
  return [
    { slug: ['company'] },
    { slug: ['business'] },
    { slug: ['facility'] },
    { slug: ['quality'] },
    { slug: ['support'] },
    { slug: ['consulting'] },
    { slug: ['admin'] }
  ];
}

export default function Page() {
  return <ShinilSite />;
}
