import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Green City Logo</title>
      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" fill="hsl(var(--primary))" stroke="none" />
      <path
        d="M15.54 8.54a5 5 0 1 0-7.07 7.07"
        stroke="hsl(var(--primary-foreground))"
      />
      <path
        d="M8.46 15.54a5 5 0 0 0 7.07-7.07"
        stroke="hsl(var(--primary-foreground))"
      />
      <path
        d="M15.54 8.54C15.07 7.15 13.63 6 12 6a6 6 0 0 0-6 6c0 1.63 1.15 3.07 2.54 3.54"
        stroke="hsl(var(--primary-foreground))"
        strokeLinecap="butt"
      />
      <path
        d="M12 18a6 6 0 0 0 6-6c0-1.63-1.15-3.07-2.54-3.54"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
      />
       <path
        d="M12 12c-3.12 0-5.65 2.53-5.65 5.65"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
      />
    </svg>
  );
}
