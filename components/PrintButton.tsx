"use client";
export default function PrintButton({ label }: { label: string }) {
  return <button onClick={() => window.print()} className="pill pill-accent print:hidden" style={{ color: "#fff" }}>{label}</button>;
}
