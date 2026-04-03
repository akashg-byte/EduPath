const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

const checkTables = async () => {
  const { data, error } = await supabase.from('colleges').select('*').limit(1);
  if (error) {
    console.error('Colleges table error:', error.message);
  } else {
    console.log('Colleges table is accessible.');
  }

  const { data: annData, error: annError } = await supabase.from('announcements').select('*').limit(1);
  if (annError) {
    console.error('Announcements table error:', annError.message);
  } else {
    console.log('Announcements table is accessible.');
  }
};

checkTables();
