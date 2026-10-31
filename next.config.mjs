const old = ["experience", "work", "lab", "expertise", "insights", "contact"];
const anchor = { work: "client-work", lab: "ai-lab" };
export default {
  async redirects() {
    return old.map((p) => ({ source: `/${p}`, destination: `/#${anchor[p] ?? p}`, permanent: false }));
  },
};
