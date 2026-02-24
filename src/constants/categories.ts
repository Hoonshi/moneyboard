export const DEFAULT_CATEGORIES = [
  { id: "food", name: "식비", color: "bg-orange-400" },
  { id: "transport", name: "교통", color: "bg-green-400" },
  { id: "housing", name: "주거/공과금", color: "bg-blue-400" },
  { id: "leisure", name: "여가/문화", color: "bg-purple-400" },
  { id: "shopping", name: "쇼핑", color: "bg-pink-400" },
  { id: "health", name: "의료/건강", color: "bg-teal-400" },
  { id: "education", name: "교육", color: "bg-yellow-400" },
  { id: "salary", name: "급여", color: "bg-blue-600" },
] as const;

export type CategoryId = (typeof DEFAULT_CATEGORIES)[number]["id"];
