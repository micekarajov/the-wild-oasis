import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://easbyzvacqwjdmycdlzn.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhc2J5enZhY3F3amRteWNkbHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNjk2NDgsImV4cCI6MjA0NDc0NTY0OH0.R2jTgBcc2IqWfFvkeakssSUt-zUalUk7yg8y8eUn-BM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
