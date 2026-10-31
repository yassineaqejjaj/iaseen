"use client";
export default function PrintButton() {
  return <button onClick={() => window.print()} className="btn btn-primary print:hidden">Save as PDF</button>;
}
