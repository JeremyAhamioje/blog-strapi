import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo({ src, children }: { src: string | null; children?: React.ReactNode; }) {
  return (
    <Link href="/" aria-label="Back to homepage" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
      {src && <Image src={src} alt="logo" width={40} height={40} style={{ borderRadius: "2px" }} />}
      {children}
    </Link>
  );
}
