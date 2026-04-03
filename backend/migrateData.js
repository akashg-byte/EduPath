const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Anon Key in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const migrateData = async () => {
  try {
    // 1. Migrate Colleges (from courses.json)
    const coursesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'courses.json'), 'utf8'));
    console.log(`Migrating ${coursesData.length} colleges...`);
    
    for (const college of coursesData) {
      const { error } = await supabase.from('colleges').upsert({
        id: college.id,
        name: college.name,
        location: college.location,
        type: college.type,
        description: college.description,    
        programs: college.programs,
        status: college.status,
        cutoff: parseFloat(college.cutoff) || 0,
        fees: parseFloat(college.fees) || 0
      });
      if (error) console.error(`Error migrating college ${college.name}:`, error);
    }

    // 2. Migrate Announcements
    const announcementsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'announcements.json'), 'utf8'));
    console.log(`Migrating ${announcementsData.length} announcements...`);
    
    for (const item of announcementsData) {
      const { error } = await supabase.from('announcements').upsert({
        title: item.title,
        content: item.content,
        date: item.date,
        category: item.category,
        link: item.link
      });
      if (error) console.error(`Error migrating announcement ${item.title}:`, error);
    }

    console.log('Migration complete!');
  } catch (err) {
    console.error('Migration failed:', err);
  }
};

migrateData();
