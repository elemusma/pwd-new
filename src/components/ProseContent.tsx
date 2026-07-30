// WordPress embeds (e.g. YouTube) hardcode width/height attributes on the
// <iframe> itself. CSS on the wrapping div can't override that — only CSS
// targeting the iframe directly can (see the [&_iframe]:aspect-video etc.
// classes callers pass in). aspect-video is a fixed 16:9 evaluated by the
// layout engine itself, so it's correct on first paint with no JS involved
// — unlike computing height from an observed width at runtime, which is one
// more place for timing bugs to creep in for zero benefit here, since every
// embed in this content is a standard 16:9 YouTube video.
export default function ProseContent({ html, className }: { html: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
