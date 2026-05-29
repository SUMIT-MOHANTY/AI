import { categories } from "../data/categories";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Fetch all categories (adds 300ms latency simulation)
  async getCategories() {
    await delay(300);
    return categories;
  },

  // Fetch specific category
  async getCategoryById(id) {
    await delay(250);
    const category = categories.find((cat) => cat.id === id);
    if (!category) throw new Error(`Category ${id} not found`);
    return category;
  },

  // Fetch specific topic under category
  async getTopicById(categoryId, topicId) {
    await delay(200);
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) throw new Error(`Category ${categoryId} not found`);
    const topic = category.topics.find((top) => top.id === topicId);
    if (!topic) throw new Error(`Topic ${topicId} not found`);
    return { ...topic, categoryId, categoryTitle: category.title, categoryColor: category.color };
  },

  // Fuzzy-find matching topics or categories
  async searchTopics(query) {
    await delay(200);
    if (!query || query.trim() === "") return [];
    
    const searchTerms = query.toLowerCase().split(/\s+/);
    const results = [];

    categories.forEach((category) => {
      category.topics.forEach((topic) => {
        let matchScore = 0;
        const searchTarget = `${category.title} ${topic.title} ${topic.shortDesc} ${topic.content}`.toLowerCase();

        searchTerms.forEach((term) => {
          if (searchTarget.includes(term)) {
            matchScore += 1;
            // Boost exact matches in title
            if (topic.title.toLowerCase().includes(term)) matchScore += 2;
            if (category.title.toLowerCase().includes(term)) matchScore += 1;
          }
        });

        if (matchScore > 0) {
          results.push({
            topicId: topic.id,
            topicTitle: topic.title,
            topicShortDesc: topic.shortDesc,
            categoryId: category.id,
            categoryTitle: category.title,
            categoryColor: category.color,
            score: matchScore,
          });
        }
      });
    });

    return results.sort((a, b) => b.score - a.score);
  }
};
