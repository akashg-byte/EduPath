import axios from 'axios';

const API_BASE = '/api';

export const getCourses = async () => {
  const response = await axios.get(`${API_BASE}/courses`);
  return response.data;
};

export const getAdmissions = async () => {
  const response = await axios.get(`${API_BASE}/admissions`);
  return response.data;
};

export const getAnnouncements = async () => {
  const response = await axios.get(`${API_BASE}/announcements`);
  return response.data;
};

export const analyzeCareer = async (userData) => {
  const response = await axios.post(`${API_BASE}/analyze-career`, userData);
  return response.data.results;
};

export const submitContactForm = async (formData) => {
  const response = await axios.post(`${API_BASE}/contact`, formData);
  return response.data;
};

export const predictColleges = async (marks) => {
  const response = await axios.post(`${API_BASE}/predict-colleges`, marks);
  return response.data;
};

// Admin stats and profiles (keeping direct supabase for now if backend doesn't have them yet, 
// but backend has no /api/profiles or /api/stats in research)
// However, I should probably check if I should move these too.
// For now, I'll keep them as is using supabase if needed, or just focus on what's in the backend.

import { supabase } from '../supabaseClient';

export const getProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getContacts = async () => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getDashboardStats = async () => {
  try {
     const [profiles, contacts, colleges] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('colleges').select('*', { count: 'exact', head: true })
      ]);
      return {
        students: profiles.count || 0,
        enquiries: contacts.count || 0,
        colleges: colleges.count || 0
      };
  } catch (err) {
      console.error('Stats error:', err);
      return { students: 0, enquiries: 0, colleges: 0 };
  }
};

export const seedDatabase = async () => {
  const sampleColleges = [
    { name: 'VIT University', location: 'Vellore', type: 'Private', programs: ['B.Tech', 'M.Tech'], status: 'Active', cutoff: 195.5, fees: 200000 },
    { name: 'SRM Institute', location: 'Chennai', type: 'Private', programs: ['B.Tech', 'B.Arch'], status: 'Active', cutoff: 188.0, fees: 250000 },
    { name: 'Anna University', location: 'Chennai', type: 'Government', programs: ['B.E', 'B.Tech'], status: 'Active', cutoff: 199.0, fees: 50000 }
  ];

  const { error } = await supabase.from('colleges').insert(sampleColleges);
  if (error) throw error;
  return { message: 'Sample data seeded successfully!' };
};

export const addCollege = async (collegeData) => {
  const { data, error } = await supabase.from('colleges').insert([collegeData]);
  if (error) throw error;
  return data;
};

export const updateCollege = async (id, collegeData) => {
  const { data, error } = await supabase.from('colleges').update(collegeData).eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteCollege = async (id) => {
  const { data, error } = await supabase.from('colleges').delete().eq('id', id);
  if (error) throw error;
  return data;
};
