// Card artwork for a project.
//
// Every project in app/data/projects.js carries its own `banner` — an SVG in
// public/img/banners drawn to show what that project actually does. This component
// renders it, and falls back to a generated panel only for a project added without
// artwork yet: layered panels in the same visual language, no lettering, so a new entry
// still looks like part of the set until its own banner is drawn.
//
// The fallback's layout varies deterministically with the project id, so two projects
// never look identical but a given project always looks the same.

// Small string hash. Not security-sensitive; it only picks a layout variant.
function hashOf(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
  return h;
}

export default function ProjectBanner(props) {
  const p = props.item;

  // One return, not an early return for the image case: the compiler builds each
  // component into a single element factory, and a second `return` leaves the custom
  // element empty once the client takes over (SSG renders it, hydration blanks it).
  const h = hashOf(p.id);
  const count = 4 + (h % 3);
  const lit = h % count;
  const nodes = Array.from({ length: count }, (_, i) => ({
    x: 190 + i * (420 / (count - 1)),
    lit: i === lit,
  }));
  // Row widths vary a little per project so the stack does not look stamped.
  const rows = [150 + (h % 40), 96 + (h % 60), 128 + (h % 30)];
  // SVG ids are document-global and several of these can render on one page, so every
  // referenced id is namespaced with the project id.
  const uid = `pb-${p.id}`;

  return p.banner ? (
    <img
      src={p.banner}
      alt=""
      loading="lazy"
      decoding="async"
      width="800"
      height="300"
      class="w-full aspect-[8/3] object-cover"
    />
  ) : (
    <svg
      viewBox="0 0 800 300"
      width="800"
      height="300"
      class="w-full aspect-[8/3] object-cover"
      role="img"
      aria-label=""
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0b1220" />
          <stop offset="1" stop-color="#131c2f" />
        </linearGradient>
        <pattern
          id={`${uid}-grid`}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0H0V40"
            fill="none"
            stroke="#7c8db0"
            stroke-opacity=".13"
            stroke-width="1"
          />
        </pattern>
        <radialGradient id={`${uid}-glow`} cx=".5" cy=".1" r=".8">
          <stop offset="0" stop-color="#ff851b" stop-opacity=".22" />
          <stop offset="1" stop-color="#ff851b" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="300" fill={`url(#${uid}-bg)`} />
      <rect width="800" height="300" fill={`url(#${uid}-grid)`} />
      <rect width="800" height="300" fill={`url(#${uid}-glow)`} />

      {/* Layered panels — a generic stand-in for "a thing being built". */}
      <rect
        x="212"
        y="60"
        width="330"
        height="120"
        rx="12"
        fill="#131c2f"
        stroke="#7c8db0"
        stroke-opacity=".3"
        stroke-width="2"
      />
      <rect
        x="248"
        y="84"
        width="330"
        height="120"
        rx="12"
        fill="#0f1729"
        stroke="#ff851b"
        stroke-width="2"
      />
      {rows.map((w, i) => (
        <rect
          x="274"
          y={110 + i * 26}
          width={w}
          height="12"
          rx="5"
          fill={i === 1 ? "#ff851b" : "#7c8db0"}
          fill-opacity={i === 1 ? 0.8 : 0.26}
        />
      ))}

      {/* Connector with nodes — echoes the pipeline motif of the drawn banners. */}
      <path d="M190 244 H610" stroke="#7c8db0" stroke-opacity=".3" stroke-width="2" />
      {nodes.map((n) => (
        <circle
          cx={n.x}
          cy="244"
          r={n.lit ? 8 : 5}
          fill={n.lit ? "#ff851b" : "#7c8db0"}
          fill-opacity={n.lit ? 1 : 0.5}
        />
      ))}
    </svg>
  );
}
