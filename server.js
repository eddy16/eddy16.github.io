'use strict';
const express = require('express');
const fs      = require('fs');
const path    = require('path');
const yaml    = require('js-yaml');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

function loadConfig() {
  return yaml.load(fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8'));
}

app.get('*', (req, res) => {
  res.render('index', { config: loadConfig() });
});

app.listen(PORT, () => console.log(`Dev server: http://localhost:${PORT}`));
