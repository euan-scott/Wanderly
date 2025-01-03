const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
//const destinationsRoutes = require('./routes/destinations');
//const bookingsRoutes = require('./routes/bookings');

const app = express();
const PORT = 3000;

app.use(cors({ origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', authRoutes);
//app.use('/destinations', destinationsRoutes);
//app.use('/bookings', bookingsRoutes);


// Test route
app.get('/', (req, res) => {
    res.send('Server is running!');
  });
  
// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



// Commented out the routes for bookings and destinations 