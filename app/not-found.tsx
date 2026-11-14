import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="frame section-l">
      <p className="label text-stone">404</p>
      <h1 className="display-l mt-6">
        This page isn’t <em>in the collection</em>
      </h1>
      <p className="lede mt-6 max-w-[40ch] text-stone">
        It may have moved, or the link may be mistyped. Here are the best places to start.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button href="/">Go to the home page</Button>
        <Button href="/services" variant="text">
          See services
        </Button>
      </div>
    </section>
  );
}
