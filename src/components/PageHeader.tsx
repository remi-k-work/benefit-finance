// types
interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <>
      <h1 className="from-primary to-background mt-4 bg-linear-to-r p-3 font-sans text-3xl leading-none">{title}</h1>
      <p className="from-secondary to-background mb-8 bg-linear-to-r p-3 font-sans text-xl">{description}</p>
    </>
  );
}
