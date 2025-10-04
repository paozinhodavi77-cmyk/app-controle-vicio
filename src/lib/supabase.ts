import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface UserProfile {
  id: string
  email: string
  name: string
  avatar: string
  streak: number
  level: number
  xp: number
  join_date: string
  goals: string[]
  total_days_clean: number
  longest_streak: number
  relapses: number
  mood: number
  energy: number
  productivity: number
  confidence: number
  created_at: string
  updated_at: string
}

export interface Mission {
  id: string
  user_id: string
  title: string
  description: string
  xp: number
  completed: boolean
  category: 'mind' | 'body' | 'career' | 'social'
  difficulty: 'easy' | 'medium' | 'hard'
  time_required: string
  completed_at?: string
  created_at: string
}

export interface Achievement {
  id: string
  user_id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  requirement: number
  category: 'streak' | 'missions' | 'community' | 'growth'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlocked_at?: string
  created_at: string
}

export interface HabitTracker {
  id: string
  user_id: string
  name: string
  category: string
  streak: number
  completed_today: boolean
  target: number
  unit: string
  created_at: string
  updated_at: string
}

export interface EmergencyLog {
  id: string
  user_id: string
  technique_used: string
  duration: number
  effectiveness_rating: number
  notes?: string
  created_at: string
}

export interface CommunityMessage {
  id: string
  user_id: string
  user_name: string
  user_avatar: string
  message: string
  created_at: string
}