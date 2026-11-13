import type { CSSProperties } from "react";

export type IconName =
  | "arrow"
  | "arrow-up"
  | "chevron"
  | "pin"
  | "user"
  | "bag"
  | "sparkle"
  | "shield"
  | "truck"
  | "leaf"
  | "check"
  | "play"
  | "star"
  | "close"
  | "plus"
  | "minus"
  | "clock"
  | "drop"
  | "menu"
  | "heart"
  | "phone"
  | "wash";

const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </>
  ),
  "arrow-up": (
    <>
      <path d="M6 18 18 6M6 6h12v12" />
    </>
  ),
  chevron: <path d="m8 10 4 4 4-4" />,
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
    </>
  ),
  bag: (
    <>
      <path d="M5 7h14l1 14H4L5 7Z" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </>
  ),
  sparkle: (
    <>
      <path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Z" />
      <path d="M20 2v4M18 4h4" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  truck: (
    <>
      <path d="M3 5h11v12H3zM14 9h4l3 4v4h-7" />
      <circle cx="7" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 3c-9-1-17 4-16 11 1 8 15 7 16-11Z" />
      <path d="M4 21 15 10M8 16v-5M8 16h5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  play: <path d="m9 5 11 7-11 7V5Z" />,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  drop: <path d="M12 2C9 7 5 10 5 15a7 7 0 0 0 14 0c0-5-4-8-7-13Z" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  heart: <path d="M20 5c-3-3-7-1-8 1-1-2-5-4-8-1-5 5 3 11 8 15 5-4 13-10 8-15Z" />,
  phone: <path d="m7 3-4 3c0 8 7 15 15 15l3-4-5-4-2 3c-3-1-5-3-6-6l3-2-4-5Z" />,
  wash: (
    <>
      <rect x="4" y="3" width="16" height="19" rx="2" />
      <circle cx="12" cy="14" r="5" />
      <path d="M7 6h.01M10 6h.01M9 14c2 2 4-2 6 0" />
    </>
  ),
};

export default function Icon({
  name,
  size = 20,
  className = "",
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 20C1 21 2 2 12 3c7 0 8 9 8 17Z" fill="currentColor" />
      <path
        d="M20 20C19 1 38 2 37 12c0 7-9 8-17 8ZM20 20c19-1 18 18 8 17-7 0-8-9-8-17ZM20 20C21 39 2 38 3 28c0-7 9-8 17-8Z"
        fill="currentColor"
      />
    </svg>
  );
}
