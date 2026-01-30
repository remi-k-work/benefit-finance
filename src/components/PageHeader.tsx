// types
interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <>
      <h1 className="from-primary to-background mt-4 bg-linear-to-r p-3 font-sans text-3xl leading-none md:text-4xl">{title}</h1>
      <p className="from-secondary to-background mb-8 bg-linear-to-r p-3 font-sans text-xl md:text-2xl">{description}</p>
    </>
  );
}

export function PageHeaderSkeleton() {
  return (
    <>
      <h1 className="from-primary to-background mt-4 animate-pulse bg-linear-to-r p-3 font-sans text-3xl leading-none md:text-4xl">&nbsp;</h1>
      <p className="from-secondary to-background mb-8 animate-pulse bg-linear-to-r p-3 font-sans text-xl md:text-2xl">&nbsp;</p>
    </>
  );
}
