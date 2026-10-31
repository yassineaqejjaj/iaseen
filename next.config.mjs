const old = ["experience", "work", "lab", "expertise", "insights", "contact"];
const anchor = { work: "client-work", lab: "ai-lab" };
export default {
  async redirects() {
    return [
      ...old.map((p) => ({ source: `/${p}`, destination: `/#${anchor[p] ?? p}`, permanent: false })),
      { source: "/work/french-prime-ministers-office", destination: "/work/dila-sovereign-ai", permanent: true },
      ...["", "/fr", "/ar"].map((l) => ({ source: `${l}/cv`, destination: "/Yassine-Aqejjaj-CV.pdf", permanent: true })),
    ];
  },
};
