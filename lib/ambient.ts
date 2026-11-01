/** For each section, which of the FAQ questions (index in content.qa) are the natural follow-ups. */
export const SECTION_QA: Record<string, number[]> = {
  about: [2, 4], proof: [2, 4], experience: [0, 2], "client-work": [3, 0], "ai-lab": [1, 4],
  expertise: [2, 4], insights: [5], ask: [0, 1], faq: [2, 3], contact: [2],
};
