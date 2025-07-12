const express = require('express');
const axios = require('axios');
const router = express.Router();

const FLASK_API_URL = 'http://localhost:5000/api'; // Change for production

// Proxy endpoint for chat
router.post('/chat', async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_API_URL}/chat`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying to Flask API:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Proxy endpoint for recommendations
router.post('/recommend', async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_API_URL}/recommend`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying to Flask API:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

module.exports = router;