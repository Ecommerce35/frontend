  // utils/groupOptions.js

  /**
   * Groups items by the first letter of their title property.
   * @param {Array} items - Array of items with a title property to group by.
   * @returns {Array} - Array of items with an added firstLetter property for grouping.
   */
  export function groupOptionsByFirstLetter(items) {
      return items.map((item) => {
        const firstLetter = item.title[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...item,
        };
      });
    }
  
    /**
 * Converts a string into a slug format (lowercase, spaces replaced with hyphens, non-alphanumeric characters removed).
 * @param {string} text - The string to be slugified.
 * @returns {string} - The slugified string.
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // Remove all non-word characters
    .replace(/\-\-+/g, '-');        // Replace multiple hyphens with a single one
};