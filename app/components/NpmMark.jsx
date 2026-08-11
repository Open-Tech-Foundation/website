// The npm wordmark, shown beside a package name.
//
// Single-path 24×24 glyph from simple-icons (the SVG file is CC0; the mark itself is
// npm's trademark, used here only to identify where the package is published). Inlined
// like the language marks, so the page makes no third-party request for it.
const PATH =
  "M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z";

export default function NpmMark(props) {
  const size = props.size || 16;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label="npm"
      class="shrink-0 npm-mark"
    >
      <path d={PATH} />
    </svg>
  );
}
