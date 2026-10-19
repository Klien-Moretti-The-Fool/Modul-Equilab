import { createClient } from "@supabase/supabase-js";
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const cloud = url && key ? createClient(url, key) : null;
export async function checked(promise) {
  const {
    data,
    error
  } = await promise;
  if (error) throw error;
  return data;
}
export const getProgress = async userId => await checked(cloud.from('progress').select('module_id,payload').eq('user_id', userId));
export const setProgress = async (userId, moduleId, payload) => await checked(cloud.from('progress').upsert({
  user_id: userId,
  module_id: moduleId,
  payload,
  updated_at: new Date().toISOString()
}));
