-- Create Colleges Table
CREATE TABLE colleges (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  type TEXT,
  description TEXT,
  programs TEXT,
  status TEXT,
  cutoff FLOAT,
  fees FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Reviews Table
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  college_id BIGINT REFERENCES colleges(id),
  user_name TEXT,
  rating INTEGER,
  comment TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Announcements Table
CREATE TABLE announcements (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  date TEXT,
  category TEXT,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Contacts Table
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Admissions Data Table (Process steps and info)
CREATE TABLE IF NOT EXISTS admissions_data (
  id BIGSERIAL PRIMARY KEY,
  type TEXT, -- 'process' or 'dates'
  step_number INTEGER,
  title TEXT,
  description TEXT,
  event_name TEXT,
  event_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expansion: Add more columns to colleges for better comparison
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 4.0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS accreditation TEXT DEFAULT 'NAAC A++';
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS hostel_fees DECIMAL(10,2) DEFAULT 50000;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS rank INTEGER;

-- Create Profiles Table for User Roles and Details
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  mobile TEXT,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS for Colleges
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to colleges" ON colleges FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert to colleges" ON colleges FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS for Contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert to contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read to contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');
