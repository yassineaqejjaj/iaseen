import PageHead from "@/components/PageHead";
import Journey from "@/components/Journey";
export const metadata = { title: "Experience — Yassine Aqejjaj" };
export default function Page() {
  return (
    <>
      <PageHead eyebrow="Professional Journey" title="Interactive CV">
        Open a role, then switch the lens: Leadership, AI Product or Technical.
      </PageHead>
      <Journey />
    </>
  );
}
