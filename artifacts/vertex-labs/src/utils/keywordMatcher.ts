export function scoreMatch(query: string, keywords: string[]): number {
  const stopWords = new Set(["a", "an", "the", "is", "are", "was", "were", "be", "been", "have", "has", "do", "does", "i", "me", "my", "we", "you", "your", "it", "its"]);
  const queryWords = query
    .toLowerCase()
    .replace(/[^a-z0-9\s₹]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopWords.has(w));

  if (queryWords.length === 0) return 0;

  let score = 0;

  for (const queryWord of queryWords) {
    for (const keyword of keywords) {
      const kw = keyword.toLowerCase();
      if (kw === queryWord) {
        score += 3;
      } else if (kw.includes(queryWord) || queryWord.includes(kw)) {
        score += 1.5;
      } else if (levenshtein(queryWord, kw) <= 1 && queryWord.length > 3) {
        score += 1;
      }
    }
  }

  return score;
}

function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}
