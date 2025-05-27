import axios from 'axios';
import { InstagramProfile, SearchParams, SearchResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Search for Instagram profiles based on city and keyword
 */
export async function searchInstagramProfiles(params: SearchParams): Promise<SearchResponse> {
  try {
    
    const response = await axios.post(`http://localhost:3001/api/search`, params);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message;
      throw new Error(`Search failed: ${errorMessage}`);
    }
    throw new Error('An unexpected error occurred');
  }
}

/**
 * Check if the API is reachable
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await axios.get(`${API_URL}/api/health`);
    return response.data.status === 'ok';
  } catch (error) {
    return false;
  }
}
