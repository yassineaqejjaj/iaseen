import test from "node:test";
import assert from "node:assert/strict";
import { blogDiagramSource } from "../lib/diagrams/blog.ts";

test("translated labels stay text and cannot create extra diagram nodes", () => {
  for (const label of ['Context & memory', 'Décision "humaine" [validée]', 'سياق وذاكرة', '"] --> injected["<script>']) {
    const source = blogDiagramSource("steps", { nodes: [label, "Review"], caption: "" });
    assert.equal(source.split("\n").filter(line => /^    node\d+\["/.test(line)).length, 2);
    assert.equal(source.includes("<script>"), false);
    assert.equal(source.includes('    injected['), false);
  }
});

test("loops return to the first stage; comparisons preserve both complete branches", () => {
  const loop = blogDiagramSource("loop", { nodes: ["Build", "Evaluate", "Improve"], caption: "" });
  assert.ok(loop.includes("node2 -.-> node0"));
  const compare = blogDiagramSource("compare", { nodes: ["Retrieve", "Answer"], nodes2: ["Remember", "Govern", "Answer"], heads: ["RAG", "Context"], caption: "" });
  assert.ok(compare.includes("left0 --> left1"));
  assert.ok(compare.includes("right1 --> right2"));
  assert.ok(compare.includes('subgraph left["RAG"]'));
  assert.ok(compare.includes('subgraph right["Context"]'));
});

test("Arabic progressions keep their right-to-left reading order", () => {
  const source = blogDiagramSource("steps", { nodes: ["الإدراك", "التخطيط", "التنفيذ"], caption: "" });
  assert.ok(source.startsWith("flowchart RL"));
});
