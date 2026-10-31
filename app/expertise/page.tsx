import PageHead from "@/components/PageHead";
import SkillMap from "@/components/SkillMap";
export const metadata = { title: "Expertise — Yassine Aqejjaj" };
export default function Page() {
  return (
    <>
      <PageHead eyebrow="Expertise" title="Lead. Deliver. Build.">Select a skill to see the projects and roles that prove it.</PageHead>
      <SkillMap />
    </>
  );
}
