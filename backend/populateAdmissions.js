const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

const admissionsData = [
  // Process Steps
  { type: 'process', step_number: 1, title: 'Profile Analysis', description: 'Reviewing your marks, location preferences, and career goals.' },
  { type: 'process', step_number: 2, title: 'College Filtering', description: 'Matching your cutoff with top-tier accredited institutions.' },
  { type: 'process', step_number: 3, title: 'Application Support', description: 'End-to-end guidance for TNEA counseling and choice filling.' },
  { type: 'process', step_number: 4, title: 'Safe Seat Booking', description: 'Finalizing your admission with verified partner institutions.' },
  
  // Important Dates
  { type: 'dates', event_name: 'TNEA Registration Starts', event_date: 'May 10, 2026' },
  { type: 'dates', event_name: 'Document Verification', event_date: 'June 15, 2026' },
  { type: 'dates', event_name: 'Rank List Publication', event_date: 'July 05, 2026' },
  { type: 'dates', event_name: 'General Counseling', event_date: 'July 20, 2026' },
];

async function populate() {
  console.log('Populating admissions data...');
  const { error } = await supabase.from('admissions_data').insert(admissionsData);
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Admissions data populated successfully!');
  }
}

populate();
