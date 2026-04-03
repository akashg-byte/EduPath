const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const serverless = require('serverless-http'); // Import serverless-http
const { calculateCareerScores, getTopCareers } = require('./utils/careerLogic');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read JSON data
const readData = (filename) => {
  const filePath = path.join(__dirname, 'data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Sample API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the Serverless Backend!' });
});

// API Routes
app.get('/api/courses', (req, res) => {
  try {
    const courses = readData('courses.json');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

app.get('/api/admissions', (req, res) => {
  try {
    const admissions = readData('admissions.json');
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admissions info' });
  }
});

app.get('/api/announcements', (req, res) => {
  try {
    const announcements = readData('announcements.json');
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

app.post('/api/contact', (req, res) => {
  const { name, mobile, email, query } = req.body;
  
  if (!name || (!email && !mobile) || !query) {
    return res.status(400).json({ 
      success: false,
      error: 'Please provide name, contact details (email or mobile) and your query.' 
    });
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email format' 
      });
    }
  }
  
  // Simulation of successful processing
  console.log('--- New Enquiry ---');
  console.log('Name:', name);
  console.log('Mobile:', mobile);
  console.log('Email:', email);
  console.log('Query:', query);
  
  res.status(201).json({ 
    success: true,
    message: 'Thank you! Your enquiry has been submitted. Our team will contact you within 24-48 hours.' 
  });
});

app.post('/api/predict-colleges', (req, res) => {
  const { maths, physics, chemistry } = req.body;

  if (maths === undefined || physics === undefined || chemistry === undefined) {
    return res.status(400).json({ error: 'Please provide marks for Maths, Physics, and Chemistry' });
  }

  // Engineering Cutoff Calculation: Maths + (Physics/2) + (Chemistry/2)
  const userCutoff = parseFloat(maths) + (parseFloat(physics) / 2) + (parseFloat(chemistry) / 2);

  try {
    const counselingData = readData('counseling_data.json');
    const predictions = [];

    counselingData.forEach(college => {
      const eligibleBranches = college.cutoffs.filter(branchInfo => {
        const maxCutoff = Math.max(branchInfo['2023'], branchInfo['2024'], branchInfo['2025']);
        return userCutoff >= (maxCutoff - 2); // Showing colleges within 2 marks range
      });

      if (eligibleBranches.length > 0) {
        predictions.push({
          college_id: college.college_id,
          college_name: college.college_name,
          branches: eligibleBranches.map(b => ({
            name: b.branch,
            cutoffs: { '2023': b['2023'], '2024': b['2024'], '2025': b['2025'] },
            chance: userCutoff >= Math.max(b['2023'], b['2024'], b['2025']) ? 'High' : 'Medium'
          }))
        });
      }
    });

    res.json({
      cutoff: userCutoff,
      predictions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process prediction' });
  }
});

app.post('/api/analyze-career', (req, res) => {
  const { interests, strengths, marks, budget, location } = req.body;

  if (!interests || !strengths || !marks) {
    return res.status(400).json({ error: 'Please provide interests, strengths, and marks' });
  }

  try {
    const scores = calculateCareerScores({ interests, strengths, marks });
    const careers = getTopCareers(scores);
    const allColleges = readData('career_data.json');

    // Filter colleges based on recommended careers and user constraints
    const recommendations = careers.map(career => {
      const matchingColleges = allColleges.filter(c => {
        const courseMap = {
          cse: ['CSE', 'IT'],
          medical: ['MBBS', 'Dental'],
          business: ['Business Administration', 'BBA'],
          design: ['Design'],
          law: ['Law']
        };
        
        const isMatch = courseMap[career.id]?.includes(c.course);
        const isAffordable = !budget || c.fees <= parseInt(budget);
        const isLocationMatch = !location || location === 'All' || c.location === location;
        const isEligible = c.cutoff <= parseInt(marks);

        return isMatch && isAffordable && isLocationMatch && isEligible;
      });

      return {
        ...career,
        colleges: matchingColleges
      };
    });

    res.json({
        success: true,
        results: recommendations
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to analyze career paths' });
  }
});

app.get('/', (req, res) => {
  res.send('College Admission API is running...');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
