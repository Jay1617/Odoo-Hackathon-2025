import axios from 'axios';

// Use Vite's import.meta.env instead of process.env
const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5500/api';

/**
 * Send a message to the chat API
 * @param {string} message - The user's message
 * @param {string} sessionId - The session ID for conversation context
 * @returns {Promise<Object>} - The API response
 */
export const sendChatMessage = async (message, sessionId = null) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      message: message,
      sessionId: sessionId
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Get product recommendations based on a query
 * @param {string} query - The search query or user preferences
 * @param {string} sessionId - The session ID for context
 * @returns {Promise<Object>} - The recommendations response
 */
export const getProductRecommendations = async (query, sessionId = null) => {
  try {
    const response = await axios.post(`${API_URL}/recommend`, {
      query: query,
      sessionId: sessionId
    });
    
    // Process the recommendations to match your Item component format
    if (response.data && response.data.recommendations) {
      // If recommendations is a string (like when the API returns a text description)
      if (typeof response.data.recommendations === 'string') {
        // Parse it if it looks like JSON
        try {
          if (response.data.recommendations.startsWith('[') || 
              response.data.recommendations.startsWith('{')) {
            response.data.recommendations = JSON.parse(response.data.recommendations);
          } else {
            // If it's just text, keep it as is
            console.warn('Recommendations returned as text, not products');
          }
        } catch (e) {
          console.error('Error parsing recommendations string:', e);
        }
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};
