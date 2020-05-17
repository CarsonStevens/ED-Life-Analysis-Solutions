/*jshint esversion: 8 */
const express = require('express');
const app = express();

app.engine('html', require('ejs').renderFile);
// Use the built-in express middleware for serving static files from './public'
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

// [END gae_flex_node_static_files]
module.exports = app;
