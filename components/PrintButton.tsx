"use client";
export default function PrintButton() {
  return <button onClick={() => window.print()} className="pill pill-accent print:hidden">Save as PDF</button>;
}
