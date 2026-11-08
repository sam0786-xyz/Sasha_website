import Image from "next/image";

/** Brand lockup. `tone="light"` is for dark (ink) surfaces in either theme. */
export function Logo({ tone = "auto", sub = "General Contracting" }: { tone?: "auto" | "light"; sub?: string }) {
  return (
    <span className={`brand brand--${tone}`}>
      <span className="brand__mark">
        {tone === "auto" && (
          <Image src="/sasha-mark.png" alt="" width={390} height={504} className="brand__img brand__img--dark" priority />
        )}
        <Image
          src="/sasha-mark-light.png"
          alt=""
          width={390}
          height={504}
          className={`brand__img ${tone === "auto" ? "brand__img--light" : ""}`}
          priority={tone === "light"}
        />
      </span>
      <span className="brand__word">
        <span className="brand__name">SASHA</span>
        <span className="brand__sub">{sub}</span>
      </span>
    </span>
  );
}
