// types
import type LangLoader from "@/lib/LangLoader";

interface ContentProps {
  ll: typeof LangLoader.prototype.demoModeModal;
}

export default function Content({ ll }: ContentProps) {
  return (
    <article className="z-1 grid max-h-full overflow-y-auto overscroll-y-contain px-6 py-9">
      <p className="text-center text-xl">
        {ll["You are exploring"]} <b className="text-muted-foreground">BENEFIT FINANCE</b> {ll["in demo mode."]}
      </p>
      <p className="text-center text-xl">
        {ll["Ready to make it yours?"]} <b className="text-muted-foreground">{ll["Sign In"]}</b> {ll["to your own account — or"]}{" "}
        <b className="text-muted-foreground">{ll["create one"]}</b> {ll["if you are new — and start building your financial future."]}
      </p>
    </article>
  );
}
