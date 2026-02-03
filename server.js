import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.API_PORT || process.env.PORT || 3003;

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Static files (production)
app.use(express.static(join(__dirname, 'dist')));
app.use(express.static(__dirname));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
