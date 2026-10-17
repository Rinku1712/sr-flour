const express = require('express');

// import express from 'express';
const app = express();
app.get('/', (req, res) => {
  console.log('Server is running');
});

app.listen(3000, () => {
  console.log('Server is running on Port 3000');
});
