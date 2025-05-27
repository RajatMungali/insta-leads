import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { fetchInstagramProfiles } from './services/serpApiService.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/search', async (req, res) => {
  try {
    const { city, keyword } = req.body;
    
    if (!city || !keyword) {
      return res.status(400).json({ 
        error: 'Both city and keyword are required' 
      });
    }

    const profiles = await fetchInstagramProfiles(city, keyword);
    
    res.json({
      success: true,
      profiles,
      query: {
        city,
        keyword
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'An error occurred while processing your search',
      message: error.message
    });
  }
});

// New endpoint to save profiles for form filling
app.post('/api/save-profiles', async (req, res) => {
  try {
    const profiles = req.body;
    await fs.writeFile('profiles.json', JSON.stringify(profiles, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving profiles:', error);
    res.status(500).json({ error: 'Failed to save profiles' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});