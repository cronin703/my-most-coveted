import { MDXRemote } from "next-mdx-remote/rsc";

/** Renders an MDX body from /content with editorial body styles. */
export function Mdx({ source }: { source: string }) {
  if (!source) return null;
  return (
    <div className="prose-editorial measure">
      <MDXRemote source={source} />
    </div>
  );
}
