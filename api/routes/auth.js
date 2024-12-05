const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const config = require('../../config.json');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Database configuration
const dbConfig = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbHost,
  database: config.dbName,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Test database connection route
router.get('/test-db', async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    res.json({ message: 'Database connection successful!' });
  } catch (err) {
    console.error('Database connection failed:', err);
    res.status(500).json({ message: 'Failed to connect to the database', error: err.message });
  }
});

// Register route
router.post('/register', async (req, res) => {
  const { forename, surname, email, phoneNumber, password } = req.body;

  try {
    let pool = await sql.connect(dbConfig);

      // Validate input fields
      if (!forename || !surname || !email || !phoneNumber || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

    // Check if the email already exists
    const emailCheckResult = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM [User] WHERE email = @email');

    if (emailCheckResult.recordset.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Generate a unique userId
    const userId = Math.random().toString(36).substr(2, 10);

    // Hash the password and truncate it to fit the column
    const hashedPassword = await bcrypt.hash(password, 10);
    const truncatedPassword = hashedPassword.substring(0, 50);

    // Insert the user into the database
    await pool.request()
         .input('userId', sql.VarChar, userId)
         .input('forename', sql.VarChar, forename)
         .input('surname', sql.VarChar, surname)
         .input('email', sql.VarChar, email)
         .input('phoneNumber', sql.VarChar, phoneNumber)
        .input('password', sql.VarChar, password)
         .query(`
        INSERT INTO [User] (userId, forename, surname, email, phoneNumber, password) 
        VALUES (@userId, @forename, @surname, @email, @phoneNumber, @password)
      `);

    res.json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Error in register route:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    let pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM [User] WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.recordset[0];
   

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        userId: user.userId,
        forename: user.forename,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (err) {
    console.error('Error in login route:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Forgot Password 
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check for missing email
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Connect to the database
    let pool = await sql.connect(dbConfig);

    // Check if the email exists in the database
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM [User] WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Simulate a reset token
    const resetToken = Math.random().toString(36).substring(2);

    // Simulate sending the reset token (log it to the console)
    console.log(`Simulated email sent to ${email} with reset token: ${resetToken}`);

    // Respond with a success message
    res.status(200).json({ message: `Password reset link sent to ${email}` });
  } catch (err) {
    console.error('Error in forgot-password route:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// Reset Password 
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Ensure email and new password are provided
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Both email and new password are required.' });
    }

    // Update the password in the database (No Hashing)
    let pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, newPassword) // Store plain text password
      .query('UPDATE [User] SET password = @password WHERE email = @email');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Email not found in the database.' });
    }

    res.status(200).json({ message: 'Password updated successfully! You can now log in with your new password.' });
  } catch (err) {
    console.error('Error in reset-password route:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.', error: err.message });
  }
});


module.exports = router;
