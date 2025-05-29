const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/matches', {
      headers: {
        'X-Auth-Token': process.env.API_KEY  
      }
    });

    
    const cleaned = response.data.matches.map(match => ({
      title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      date: match.utcDate,
      team1: {
        name: match.homeTeam.name,
    
      },
      team2: {
        name: match.awayTeam.name,
        logo: ''
      }
    }));

    res.json(cleaned);
  } catch (err) {
    console.error('API fetch failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
