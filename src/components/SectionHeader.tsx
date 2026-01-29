// types
interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <>
      <h2 className="from-secondary to-background my-8 bg-linear-to-r p-3 font-sans text-2xl">{title}</h2>
    </>
  );
}

export function SectionHeaderSkeleton() {
  return (
    <>
      <h2 className="from-secondary to-background my-8 animate-pulse bg-linear-to-r p-3 font-sans text-2xl">&nbsp;</h2>
    </>
  );
}
