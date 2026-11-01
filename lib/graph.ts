/** Products shown as nodes of the career constellation, and how a proof label names them. First match in `prio` order wins. */
export const PRODUCTS: { id: string; name: string; match: RegExp; prio: number }[] = [
  { id: "nova", name: "NOVA Suite", match: /NOVA|Nova/, prio: 9 },
  { id: "context", name: "Nova Context", match: /Nova Context|ORBIT/, prio: 1 },
  { id: "forge", name: "Nova Evals · FORGE", match: /FORGE|Nova Evals/, prio: 2 },
  { id: "trail", name: "TRAIL Academy", match: /TRAIL/, prio: 3 },
  { id: "medguard", name: "MedGuard AI", match: /MedGuard/, prio: 4 },
  { id: "m3aya", name: "M3aya Santé", match: /CarePilot|M3aya/, prio: 5 },
];

export const productFor = (label: string) => [...PRODUCTS].sort((a, b) => a.prio - b.prio).find((p) => p.match.test(label));
