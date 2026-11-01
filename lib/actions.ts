/** Page actions: lets the assistant (Ask My AI, command palette) drive the interface instead of only answering.
 *  Components listen for "iaseen-act"; case studies are plain navigation. */
export type PageAct =
  | { k: "filter"; v: string } // AI Lab category
  | { k: "skill"; v: string } // expertise skill key
  | { k: "node"; v: string } // constellation node id (r:Org, p:id, s:Skill)
  | { k: "case"; v: string } // case-study slug
  | { k: "page"; v: string }; // site path such as /nova

export const actKey = (a: PageAct) => `${a.k}:${a.v}`;

const TARGET: Record<Exclude<PageAct["k"], "case" | "page">, string> = { filter: "lab-grid", skill: "skill-proof", node: "constellation" };

/** Briefly highlights an element and brings it into view. */
export function flash(el: HTMLElement | null, block: ScrollLogicalPosition = "center") {
  if (!el) return;
  el.closest("details")?.setAttribute("open", ""); // reveal content folded on the home page
  el.scrollIntoView({ behavior: "smooth", block });
  el.setAttribute("data-flash", "");
  window.setTimeout(() => el.removeAttribute("data-flash"), 2000);
}

/** Runs an action. `go` handles navigation (it receives a site path such as /work/slug). */
export function runAct(a: PageAct, go: (path: string) => void) {
  if (a.k === "case") return go(`/work/${a.v}`);
  if (a.k === "page") return go(a.v);
  window.dispatchEvent(new CustomEvent<PageAct>("iaseen-act", { detail: a }));
  // Wait one frame so the target has applied the new state before it is scrolled to.
  requestAnimationFrame(() => requestAnimationFrame(() => flash(document.getElementById(TARGET[a.k]))));
}
