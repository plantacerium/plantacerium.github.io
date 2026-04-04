/**
 * Search Utilities - Fuzzy Search Engine
 * Provides reusable fuzzy search functionality
 */

export interface SearchItem {
  title: string;
  url: string;
  domain?: string;
  category?: string;
  description?: string;
  impact?: string;
  type?: string;
  icon?: string;
}

export interface SearchResult extends SearchItem {
  score: number;
  matchedField: string;
}

/**
 * Fuzzy match algorithm
 * Returns a score based on how well text matches query
 */
export function fuzzyMatch(text: string, query: string): number {
  if (!text || !query) return 0;
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  
  if (t.includes(q)) return 1;
  
  let score = 0;
  let qIndex = 0;
  let consecutiveBonus = 0;
  
  for (let i = 0; i < t.length && qIndex < q.length; i++) {
    if (t[i] === q[qIndex]) {
      score += 1 + consecutiveBonus;
      consecutiveBonus += 0.5;
      qIndex++;
    } else {
      consecutiveBonus = 0;
    }
  }
  
  if (qIndex === q.length) {
    return score / q.length;
  }
  
  return 0;
}

/**
 * Perform fuzzy search across items
 * Returns sorted results by relevance score
 */
export function fuzzySearch(items: SearchItem[], query: string, maxResults = 12): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  
  const results = items.map(item => {
    const titleScore = fuzzyMatch(item.title, q) * 3;
    const domainScore = fuzzyMatch(item.domain || '', q) * 2;
    const categoryScore = fuzzyMatch(item.category || '', q) * 1.5;
    const descScore = fuzzyMatch(item.description || item.impact || '', q) * 1;
    
    const totalScore = titleScore + domainScore + categoryScore + descScore;
    
    let matchedField = 'title';
    if (domainScore > titleScore) matchedField = 'domain';
    else if (categoryScore > titleScore) matchedField = 'category';
    else if (descScore > titleScore) matchedField = 'description';
    
    return { ...item, score: totalScore, matchedField } as SearchResult;
  });
  
  return results
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

/**
 * Get indices of matches in text for highlighting
 */
export function getMatchIndices(text: string, query: string): { start: number; end: number }[] {
  if (!text || !query) return [];
  const indices: { start: number; end: number }[] = [];
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  
  let idx = t.indexOf(q);
  while (idx !== -1) {
    indices.push({ start: idx, end: idx + q.length });
    idx = t.indexOf(q, idx + 1);
  }
  
  return indices;
}

/**
 * Highlight matching text with mark tags
 */
export function highlightMatch(text: string, query: string): string {
  if (!text || !query) return text;
  
  const indices = getMatchIndices(text, query);
  if (indices.length === 0) return text;
  
  let result = '';
  let lastEnd = 0;
  
  indices.forEach(({ start, end }) => {
    result += escapeHtml(text.slice(lastEnd, start));
    result += `<mark>${escapeHtml(text.slice(start, end))}</mark>`;
    lastEnd = end;
  });
  
  result += escapeHtml(text.slice(lastEnd));
  return result;
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
