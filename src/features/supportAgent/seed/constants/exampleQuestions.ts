// Define the example questions that a user might ask a support agent
export const EXAMPLE_QUESTIONS = [
  {
    category: "Pricing & Plans",
    question: "How much does the private client tier cost?",
  },
  {
    category: "Safety & Trust",
    question: "Is my money safe if the bank goes bankrupt?",
  },
  {
    category: "Features (Semantic)",
    question: "Can you help me reduce my capital gains taxes?",
  },
  {
    category: "Specific Details",
    question: "What are your customer support hours?",
  },
  {
    category: "Definition",
    question: "Explain the 50/30/20 rule to me.",
  },
  {
    category: "Irrelevant/Noise",
    question: "How do I bake a chocolate cake?",
  },
] as const;
