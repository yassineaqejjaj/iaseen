import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10 text-sm text-muted">
      <div className="container-x flex flex-col justify-between gap-3 md:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. AI Leader · Product Builder · Entrepreneur.</p>
        <p>
          <a className="hover:text-fg" href={profile.github}>GitHub</a> ·{" "}
          <a className="hover:text-fg" href={profile.linkedin}>LinkedIn</a> ·{" "}
          <a className="hover:text-fg" href={`mailto:${profile.email}`}>Email</a>
        </p>
      </div>
    </footer>
  );
}
