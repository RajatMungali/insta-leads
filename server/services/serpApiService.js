import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SERPAPI_KEY = process.env.SERPAPI_KEY;
const SERPAPI_URL = 'https://serpapi.com/search';

/**
 * Fetches Instagram profiles from SerpAPI based on city and keyword
 * @param {string} city - The city to search for (e.g. "Austin, TX")
 * @param {string} keyword - The niche/profession to search for (e.g. "landscape designer")
 * @returns {Promise<Array>} - Array of Instagram profiles
 */
export async function fetchInstagramProfiles(city, keyword) {
  try {
    // Format the search query for Google
    const query = `${keyword} ${city} site:instagram.com`;
    
    // Make the request to SerpAPI
    const response = await axios.get(SERPAPI_URL, {
      params: {
        api_key: SERPAPI_KEY,
        q: query,
        engine: 'google',
        num: 20, // Number of results to return
        gl: 'us', // Country to use for the search
      }
    });
    
    // Extract organic results from the response
    const { organic_results } = response.data;
    
    if (!organic_results || organic_results.length === 0) {
      return [];
    }
    
    // Parse the organic results to extract Instagram profiles
    const profiles = organic_results
      .filter(result => {
        // Ensure result is from Instagram
        return result.link && result.link.includes('instagram.com/');
      })
      .map(result => {
        // Extract the Instagram handle from the URL
        const link = result.link;
        let handle = link.split('instagram.com/')[1];
        
        // Remove trailing slashes or query parameters
        if (handle) {
          handle = handle.split('/')[0];
          handle = handle.split('?')[0];
        }
        
        // Build the profile object
        return {
          title: result.title || 'Instagram Profile',
          link: result.link,
          handle: handle || 'unknown',
          snippet: result.snippet || '',
          position: result.position,
          followerCount: 'N/A', // Follower counts not available directly from SerpAPI
        };
      });
    
    return profiles;
  } catch (error) {
    console.error('SerpAPI error:', error);
    throw new Error(`Error fetching Instagram profiles: ${error.message}`);
  }
}