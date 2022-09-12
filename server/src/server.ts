import express from 'express';

const app = express();

app.get('/ads', (req, res) => {
  return res.json([{ id: 1, game: 'CS:GO' }]);
});

app.listen('3333', () => {
  console.log('HTTP server is running');
});
