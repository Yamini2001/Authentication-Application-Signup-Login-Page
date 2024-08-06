const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const db = require('./db'); // Import the database configuration

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
