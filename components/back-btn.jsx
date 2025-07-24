"use client";
import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();

  return (
    <a
      style={{
        color: "#0042ff",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "1rem",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4em",
        background: "#f4faff",
        padding: "0.4em 1em",
        borderRadius: "999px",
        boxShadow: "0 1px 4px rgba(0,66,255,0.07)",
        cursor: "pointer",
        transition: "background 0.18s, color 0.18s",
      }}
      onClick={() => router.back()}
    >
      <span style={{ fontSize: "1.2em", lineHeight: 1 }}>&larr;</span> Back to
      Home
    </a>
  );
}
