"use client"

import { useState, useEffect } from 'react'
import { supabase, type UserProfile } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import AuthModal from '@/components/AuthModal'
import { 
  Trophy, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  Brain, 
  Heart, 
  Briefcase, 
  UserCheck,
  Calendar,
  Award,
  Star,
  Crown,
  Flame,
  CheckCircle,
  AlertTriangle,
  Play,
  Book,
  Dumbbell,
  Meditation,
  MessageCircle,
  Settings,
  Bell,
  TrendingUp,
  Lock,
  Unlock,
  ChevronRight,
  Plus,
  X,
  Timer,
  BarChart3,
  Headphones,
  Video,
  Camera,
  Mic,
  Phone,
  Mail,
  Globe,
  Smartphone,
  Wifi,
  WifiOff,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Pause,
  SkipForward,
  Repeat,
  Download,
  Share2,
  Bookmark,
  Filter,
  Search,
  MapPin,
  Clock,
  Battery,
  Signal,
  Bluetooth,
  Gamepad2,
  Lightbulb,
  Rocket,
  Diamond,
  Gift,
  Coffee,
  Moon,
  Sun,
  CloudRain,
  Thermometer,
  Wind,
  Sunrise,
  Sunset,
  Activity,
  Pulse,
  Fingerprint,
  ShieldCheck,
  AlertCircle,
  Info,
  HelpCircle,
  FileText,
  Image,
  Music,
  Folder,
  Archive,
  Trash2,
  Edit,
  Copy,
  Save,
  Upload,
  RefreshCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Move,
  MousePointer,
  Navigation,
  Compass,
  Map,
  Route,
  Car,
  Plane,
  Ship,
  Train,
  Bike,
  Walk,
  Home,
  Building,
  Store,
  School,
  Hospital,
  Bank,
  Restaurant,
  Hotel,
  Gas,
  Parking,
  Wifi as WifiIcon,
  Bluetooth as BluetoothIcon,
  LogOut
} from 'lucide-react'

interface Mission {
  id: string
  title: string
  description: string
  xp: number
  completed: boolean
  category: 'mind' | 'body' | 'career' | 'social'
  difficulty: 'easy' | 'medium' | 'hard'
  timeRequired: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  requirement: number
  category: 'streak' | 'missions' | 'community' | 'growth'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface EmergencyTechnique {
  id: string
  name: string
  description: string
  duration: string
  type: 'breathing' | 'physical' | 'mental' | 'distraction'
  effectiveness: number
}

interface MentorMessage {
  id: string
  type: 'motivation' | 'warning' | 'celebration' | 'guidance'
  title: string
  message: string
  timestamp: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

interface CommunityMember {
  id: string
  name: string
  avatar: string
  streak: number
  level: number
  country: string
  joinedDays: number
  isOnline: boolean
  lastSeen: string
}

interface WorkshopEvent {
  id: string
  title: string
  description: string
  instructor: string
  date: string
  time: string
  duration: string
  attendees: number
  maxAttendees: number
  category: 'psychology' | 'fitness' | 'productivity' | 'relationships'
  isLive: boolean
}

interface BlockedSite {
  domain: string
  category: string
  blockedAt: string
  attempts: number
}

interface HabitTracker {
  id: string
  name: string
  category: string
  streak: number
  completedToday: boolean
  target: number
  unit: string
}

export default function NoFapX() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentView, setCurrentView] = useState<'dashboard' | 'onboarding' | 'mentor' | 'community' | 'growth' | 'premium' | 'blocker' | 'analytics' | 'emergency' | 'workshops' | 'habits'>('dashboard')
  const [showSOS, setShowSOS] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sosTimer, setSosTimer] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [selectedEmergencyTechnique, setSelectedEmergencyTechnique] = useState<EmergencyTechnique | null>(null)
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([])
  const [isBlockerActive, setIsBlockerActive] = useState(true)
  const [mentorMessages, setMentorMessages] = useState<MentorMessage[]>([])
  const [showMentorChat, setShowMentorChat] = useState(false)
  const [chatInput, setChatInput] = useState('')

  // Check user authentication
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        // Fetch or create user profile
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error && error.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const newProfile: Partial<UserProfile> = {
            id: user.id,
            email: user.email || '',
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'Guerreiro',
            avatar: '🦅',
            streak: 0,
            level: 1,
            xp: 0,
            join_date: new Date().toISOString().split('T')[0],
            goals: [],
            total_days_clean: 0,
            longest_streak: 0,
            relapses: 0,
            mood: 7,
            energy: 8,
            productivity: 6,
            confidence: 7
          }

          const { data: createdProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert([newProfile])
            .select()
            .single()

          if (!createError && createdProfile) {
            setUserProfile(createdProfile)
            setCurrentView('onboarding')
          }
        } else if (!error && profile) {
          setUserProfile(profile)
          if (profile.goals.length === 0) {
            setCurrentView('onboarding')
          }
        }
      }
      
      setIsLoading(false)
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        setShowAuthModal(false)
        // Refresh the page to load user data
        window.location.reload()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setUserProfile(null)
        setShowAuthModal(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Atualizar tempo em tempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Timer SOS
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerActive && sosTimer > 0) {
      interval = setInterval(() => {
        setSosTimer(sosTimer - 1)
      }, 1000)
    } else if (sosTimer === 0) {
      setIsTimerActive(false)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, sosTimer])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) return

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (!error && data) {
      setUserProfile(data)
    }
  }

  const missions: Mission[] = [
    { id: '1', title: 'Meditação Matinal', description: '10 minutos de meditação mindfulness', xp: 50, completed: false, category: 'mind', difficulty: 'easy', timeRequired: '10 min' },
    { id: '2', title: 'Exercício Intenso', description: '45 minutos de treino cardiovascular', xp: 100, completed: false, category: 'body', difficulty: 'hard', timeRequired: '45 min' },
    { id: '3', title: 'Diário de Gratidão', description: 'Escreva 3 coisas pelas quais é grato', xp: 40, completed: false, category: 'mind', difficulty: 'easy', timeRequired: '5 min' },
    { id: '4', title: 'Leitura Produtiva', description: '30 páginas de desenvolvimento pessoal', xp: 75, completed: false, category: 'career', difficulty: 'medium', timeRequired: '30 min' },
    { id: '5', title: 'Conexão Social', description: 'Ligue para um amigo ou familiar', xp: 60, completed: false, category: 'social', difficulty: 'medium', timeRequired: '15 min' },
    { id: '6', title: 'Banho Frio', description: '2 minutos de banho gelado', xp: 80, completed: false, category: 'body', difficulty: 'hard', timeRequired: '2 min' },
    { id: '7', title: 'Planejamento do Dia', description: 'Organize suas prioridades', xp: 45, completed: false, category: 'career', difficulty: 'easy', timeRequired: '10 min' },
    { id: '8', title: 'Respiração Profunda', description: '5 minutos de respiração consciente', xp: 35, completed: false, category: 'mind', difficulty: 'easy', timeRequired: '5 min' }
  ]

  const achievements: Achievement[] = [
    { id: '1', title: 'Primeiro Passo', description: '1 dia limpo', icon: '🌱', unlocked: (userProfile?.streak || 0) >= 1, requirement: 1, category: 'streak', rarity: 'common' },
    { id: '2', title: 'Guerreiro Iniciante', description: '7 dias limpos', icon: '⚔️', unlocked: (userProfile?.streak || 0) >= 7, requirement: 7, category: 'streak', rarity: 'common' },
    { id: '3', title: 'Disciplinado', description: '30 dias limpos', icon: '🏆', unlocked: (userProfile?.streak || 0) >= 30, requirement: 30, category: 'streak', rarity: 'rare' },
    { id: '4', title: 'Campeão', description: '90 dias limpos', icon: '👑', unlocked: (userProfile?.streak || 0) >= 90, requirement: 90, category: 'streak', rarity: 'epic' },
    { id: '5', title: 'Lenda Imortal', description: '365 dias limpos', icon: '⚡', unlocked: (userProfile?.streak || 0) >= 365, requirement: 365, category: 'streak', rarity: 'legendary' },
    { id: '6', title: 'Mestre das Missões', description: 'Complete 100 missões', icon: '🎯', unlocked: false, requirement: 100, category: 'missions', rarity: 'rare' },
    { id: '7', title: 'Líder Comunitário', description: 'Ajude 50 membros', icon: '🤝', unlocked: false, requirement: 50, category: 'community', rarity: 'epic' },
    { id: '8', title: 'Transformação Total', description: 'Melhore todas as áreas em 80%', icon: '🚀', unlocked: false, requirement: 80, category: 'growth', rarity: 'legendary' }
  ]

  const emergencyTechniques: EmergencyTechnique[] = [
    { id: '1', name: 'Respiração 4-7-8', description: 'Inspire por 4s, segure por 7s, expire por 8s', duration: '2 min', type: 'breathing', effectiveness: 85 },
    { id: '2', name: 'Flexões Explosivas', description: '20 flexões o mais rápido possível', duration: '1 min', type: 'physical', effectiveness: 90 },
    { id: '3', name: 'Banho Gelado', description: 'Água fria por 2 minutos', duration: '2 min', type: 'physical', effectiveness: 95 },
    { id: '4', name: 'Meditação de Emergência', description: 'Foque na respiração e observe os pensamentos', duration: '5 min', type: 'mental', effectiveness: 80 },
    { id: '5', name: 'Caminhada Rápida', description: 'Saia de casa e caminhe por 10 minutos', duration: '10 min', type: 'physical', effectiveness: 88 },
    { id: '6', name: 'Ligação de Emergência', description: 'Ligue para seu parceiro de responsabilidade', duration: '5 min', type: 'distraction', effectiveness: 92 },
    { id: '7', name: 'Visualização Poderosa', description: 'Imagine-se como a pessoa que quer ser', duration: '3 min', type: 'mental', effectiveness: 75 },
    { id: '8', name: 'Música Motivacional', description: 'Ouça sua playlist de força', duration: '4 min', type: 'distraction', effectiveness: 70 }
  ]

  const communityMembers: CommunityMember[] = [
    { id: '1', name: 'Alexandre_Warrior', avatar: '👑', streak: 127, level: 8, country: 'Brasil', joinedDays: 200, isOnline: true, lastSeen: 'Agora' },
    { id: '2', name: 'Phoenix_Rising', avatar: '🔥', streak: 89, level: 6, country: 'Portugal', joinedDays: 150, isOnline: true, lastSeen: 'Agora' },
    { id: '3', name: 'Steel_Mind', avatar: '🛡️', streak: 76, level: 5, country: 'Brasil', joinedDays: 120, isOnline: false, lastSeen: '2h atrás' },
    { id: '4', name: 'Night_Guardian', avatar: '🦅', streak: 45, level: 4, country: 'Angola', joinedDays: 80, isOnline: true, lastSeen: 'Agora' },
    { id: '5', name: 'Iron_Will', avatar: '⚡', streak: 156, level: 9, country: 'Moçambique', joinedDays: 300, isOnline: false, lastSeen: '1h atrás' },
    { id: '6', name: 'Diamond_Soul', avatar: '💎', streak: 234, level: 12, country: 'Brasil', joinedDays: 400, isOnline: true, lastSeen: 'Agora' }
  ]

  const workshops: WorkshopEvent[] = [
    { id: '1', title: 'Vencendo Gatilhos Noturnos', description: 'Estratégias para resistir aos impulsos durante a noite', instructor: 'Dr. Carlos Mendes', date: '2024-01-15', time: '20:00', duration: '90 min', attendees: 234, maxAttendees: 500, category: 'psychology', isLive: true },
    { id: '2', title: 'Treino de Força Mental', description: 'Exercícios práticos para fortalecer a disciplina', instructor: 'Coach Marcus Silva', date: '2024-01-16', time: '19:00', duration: '60 min', attendees: 189, maxAttendees: 300, category: 'fitness', isLive: false },
    { id: '3', title: 'Produtividade Extrema', description: 'Como canalizar energia sexual em produtividade', instructor: 'Ana Productivity', date: '2024-01-17', time: '18:30', duration: '75 min', attendees: 156, maxAttendees: 250, category: 'productivity', isLive: false },
    { id: '4', title: 'Relacionamentos Saudáveis', description: 'Construindo conexões autênticas', instructor: 'Dra. Maria Relacionamentos', date: '2024-01-18', time: '21:00', duration: '120 min', attendees: 98, maxAttendees: 200, category: 'relationships', isLive: false }
  ]

  const habits: HabitTracker[] = [
    { id: '1', name: 'Exercício Físico', category: 'Corpo', streak: 12, completedToday: true, target: 30, unit: 'minutos' },
    { id: '2', name: 'Meditação', category: 'Mente', streak: 8, completedToday: false, target: 10, unit: 'minutos' },
    { id: '3', name: 'Leitura', category: 'Crescimento', streak: 15, completedToday: true, target: 20, unit: 'páginas' },
    { id: '4', name: 'Água', category: 'Saúde', streak: 20, completedToday: false, target: 2, unit: 'litros' },
    { id: '5', name: 'Sono', category: 'Saúde', streak: 5, completedToday: true, target: 8, unit: 'horas' },
    { id: '6', name: 'Gratidão', category: 'Mente', streak: 18, completedToday: false, target: 3, unit: 'itens' }
  ]

  const goalOptions = [
    'Melhorar relacionamentos',
    'Aumentar produtividade',
    'Desenvolver disciplina',
    'Melhorar saúde mental',
    'Focar na carreira',
    'Construir autoestima',
    'Ter mais energia',
    'Melhorar sono',
    'Aumentar confiança',
    'Desenvolver espiritualidade',
    'Melhorar forma física',
    'Criar rotinas saudáveis'
  ]

  const completeMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId)
    if (mission && !mission.completed && userProfile) {
      mission.completed = true
      const newXp = userProfile.xp + mission.xp
      const newLevel = Math.floor(newXp / 500) + 1
      updateUserProfile({ 
        xp: newXp,
        level: newLevel
      })
    }
  }

  const handleOnboardingNext = () => {
    if (onboardingStep < 3) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      setCurrentView('dashboard')
    }
  }

  const startJourney = async () => {
    if (userProfile) {
      await updateUserProfile({ 
        goals: selectedGoals, 
        streak: 1 
      })
      setCurrentView('dashboard')
    }
  }

  const startEmergencyTechnique = (technique: EmergencyTechnique) => {
    setSelectedEmergencyTechnique(technique)
    const duration = parseInt(technique.duration) * 60 // converter para segundos
    setSosTimer(duration)
    setIsTimerActive(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const sendMentorMessage = () => {
    if (chatInput.trim() && userProfile) {
      const newMessage: MentorMessage = {
        id: Date.now().toString(),
        type: 'guidance',
        title: 'Resposta do X-Mentor',
        message: `Entendo sua situação, ${userProfile.name}. Baseado no que você disse: "${chatInput}", recomendo focar na respiração profunda e lembrar dos seus objetivos. Você já percorreu ${userProfile.streak} dias - isso é prova da sua força interior. Continue firme!`,
        timestamp: new Date().toLocaleTimeString(),
        priority: 'medium'
      }
      setMentorMessages(prev => [newMessage, ...prev])
      setChatInput('')
    }
  }

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 animate-pulse">
            X
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-yellow-400 bg-clip-text text-transparent mb-2">
            NOFAPX
          </h1>
          <p className="text-gray-400">Carregando sua jornada...</p>
        </div>
      </div>
    )
  }

  // Show auth modal if not authenticated
  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center space-y-8 max-w-md mx-auto p-6">
            <div>
              <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                X
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-yellow-400 bg-clip-text text-transparent mb-4">
                NOFAPX
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                O aplicativo definitivo para vencer o vício e construir uma vida extraordinária
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span>Progresso sincronizado em todos os dispositivos</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Users className="w-5 h-5 text-green-400" />
                <span>Comunidade global de mais de 12.000 guerreiros</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>X-Mentor IA personalizado 24/7</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Todas as funcionalidades premium liberadas!</span>
              </div>
            </div>

            <button 
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              🚀 COMEÇAR JORNADA AGORA
            </button>

            <p className="text-xs text-gray-500">
              Junte-se a milhares de guerreiros que já transformaram suas vidas
            </p>
          </div>
        </div>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      </>
    )
  }

  // Show onboarding if user hasn't completed it
  if (currentView === 'onboarding' && userProfile && userProfile.goals.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Onboarding Header */}
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              X
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-yellow-400 bg-clip-text text-transparent">
              NOFAPX
            </h1>
            <p className="text-gray-400 text-sm mt-2">Sua jornada de libertação</p>
          </div>
        </div>

        <div className="flex-1 px-6">
          {onboardingStep === 0 && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-cyan-400">Bem-vindo, {userProfile.name}!</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Sua jornada de libertação começa agora.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-2xl p-6 border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">🎯 Sua Missão</h3>
                <p className="text-gray-300">
                  Quebrar as correntes do vício e construir uma versão mais forte, disciplinada e livre de si mesmo.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-400">🎉 TODAS AS FUNCIONALIDADES LIBERADAS!</h3>
                <p className="text-gray-300">
                  Acesso completo e gratuito a todos os recursos premium: X-Mentor IA, bloqueador avançado, workshops ao vivo, analytics detalhados e muito mais!
                </p>
              </div>

              <button 
                onClick={handleOnboardingNext}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Começar Jornada
              </button>
            </div>
          )}

          {onboardingStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">Defina Seus Objetivos</h2>
                <p className="text-gray-400">O que você quer alcançar nesta jornada?</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {goalOptions.map((goal, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (selectedGoals.includes(goal)) {
                        setSelectedGoals(selectedGoals.filter(g => g !== goal))
                      } else {
                        setSelectedGoals([...selectedGoals, goal])
                      }
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      selectedGoals.includes(goal)
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                        : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{goal}</span>
                      {selectedGoals.includes(goal) && <CheckCircle className="w-5 h-5 text-cyan-400" />}
                    </div>
                  </button>
                ))}
              </div>

              <button 
                onClick={startJourney}
                disabled={selectedGoals.length === 0}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Finalizar Setup ({selectedGoals.length} selecionados)
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SOS Modal */}
      {showSOS && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-red-900/20 border border-red-500 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center space-y-4">
              <div className="text-4xl">🚨</div>
              <h3 className="text-xl font-bold text-red-400">MODO SOS ATIVADO</h3>
              <p className="text-gray-300">Respire fundo. Você é mais forte que isso.</p>
              
              {selectedEmergencyTechnique && isTimerActive ? (
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h4 className="font-bold text-cyan-400 mb-2">{selectedEmergencyTechnique.name}</h4>
                    <p className="text-gray-300 text-sm mb-4">{selectedEmergencyTechnique.description}</p>
                    <div className="text-4xl font-bold text-yellow-400">{formatTime(sosTimer)}</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${((parseInt(selectedEmergencyTechnique.duration) * 60 - sosTimer) / (parseInt(selectedEmergencyTechnique.duration) * 60)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsTimerActive(false)
                      setSosTimer(0)
                      setSelectedEmergencyTechnique(null)
                    }}
                    className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Parar Técnica
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="font-bold text-yellow-400">Técnicas de Emergência:</h4>
                  {emergencyTechniques.slice(0, 6).map((technique) => (
                    <button 
                      key={technique.id}
                      onClick={() => startEmergencyTechnique(technique)}
                      className={`w-full p-3 rounded-xl font-semibold transition-colors text-left ${
                        technique.type === 'breathing' ? 'bg-blue-600 hover:bg-blue-700' :
                        technique.type === 'physical' ? 'bg-green-600 hover:bg-green-700' :
                        technique.type === 'mental' ? 'bg-purple-600 hover:bg-purple-700' :
                        'bg-orange-600 hover:bg-orange-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold">{technique.name}</div>
                          <div className="text-sm opacity-90">{technique.duration} • {technique.effectiveness}% eficácia</div>
                        </div>
                        <Timer className="w-5 h-5" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <button 
                onClick={() => setShowSOS(false)}
                className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-semibold transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mentor Chat Modal */}
      {showMentorChat && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-purple-500/20 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-purple-400">X-Mentor IA</h3>
                <button onClick={() => setShowMentorChat(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {mentorMessages.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <Brain className="w-12 h-12 mx-auto mb-2 text-purple-400" />
                    <p>Olá {userProfile?.name}! Como posso te ajudar hoje?</p>
                  </div>
                ) : (
                  mentorMessages.map((message) => (
                    <div key={message.id} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-purple-400">{message.title}</span>
                        <span className="text-xs text-gray-400">{message.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-300">{message.message}</p>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && sendMentorMessage()}
                />
                <button 
                  onClick={sendMentorMessage}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{userProfile?.avatar}</div>
            <div>
              <h2 className="font-bold text-cyan-400">{userProfile?.name || 'Guerreiro'}</h2>
              <p className="text-sm text-gray-400">Nível {userProfile?.level} • {userProfile?.xp} XP</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right mr-2">
              <div className="text-sm font-bold text-green-400">{currentTime.toLocaleTimeString()}</div>
              <div className="text-xs text-gray-400">Dia {userProfile?.streak}</div>
            </div>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={handleSignOut}
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-2">
        <div className="flex space-x-1 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Trophy },
            { id: 'mentor', label: 'X-Mentor', icon: Brain },
            { id: 'emergency', label: 'SOS', icon: AlertTriangle },
            { id: 'community', label: 'Irmandade', icon: Users },
            { id: 'growth', label: 'Crescimento', icon: TrendingUp },
            { id: 'blocker', label: 'Bloqueador', icon: Shield },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'workshops', label: 'Workshops', icon: Video },
            { id: 'habits', label: 'Hábitos', icon: Target }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                currentView === id
                  ? 'bg-cyan-500 text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-6">
        {currentView === 'dashboard' && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400">{userProfile?.streak}</div>
                <p className="text-sm text-gray-400">Dias Limpos</p>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-green-400">{userProfile?.level}</div>
                <p className="text-sm text-gray-400">Nível</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-yellow-400">{userProfile?.xp}</div>
                <p className="text-sm text-gray-400">XP Total</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-400">{userProfile?.longest_streak}</div>
                <p className="text-sm text-gray-400">Recorde</p>
              </div>
            </div>

            {/* Mood & Energy Tracker */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-cyan-400 mb-4">📊 Estado Atual</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Humor', value: userProfile?.mood || 7, color: 'blue', icon: '😊' },
                  { label: 'Energia', value: userProfile?.energy || 8, color: 'green', icon: '⚡' },
                  { label: 'Produtividade', value: userProfile?.productivity || 6, color: 'purple', icon: '🎯' },
                  { label: 'Confiança', value: userProfile?.confidence || 7, color: 'yellow', icon: '💪' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-lg font-bold text-white">{stat.value}/10</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className={`bg-${stat.color}-500 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${stat.value * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SOS Button */}
            <button 
              onClick={() => setShowSOS(true)}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🚨 BOTÃO SOS - PRECISO DE AJUDA AGORA
            </button>

            {/* Daily Missions */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Missões Diárias
              </h3>
              
              <div className="space-y-3">
                {missions.slice(0, 6).map((mission) => (
                  <div key={mission.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-white">{mission.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          mission.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                          mission.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {mission.difficulty.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{mission.description}</p>
                      <p className="text-xs text-gray-500 mt-1">⏱️ {mission.timeRequired}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-yellow-400 font-semibold">+{mission.xp} XP</span>
                      <button
                        onClick={() => completeMission(mission.id)}
                        disabled={mission.completed}
                        className={`p-2 rounded-lg transition-colors ${
                          mission.completed
                            ? 'bg-green-600 text-white cursor-not-allowed'
                            : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                        }`}
                      >
                        {mission.completed ? <CheckCircle className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                Conquistas
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      achievement.unlocked
                        ? achievement.rarity === 'legendary' ? 'border-purple-500 bg-purple-500/10' :
                          achievement.rarity === 'epic' ? 'border-orange-500 bg-orange-500/10' :
                          achievement.rarity === 'rare' ? 'border-blue-500 bg-blue-500/10' :
                          'border-green-500 bg-green-500/10'
                        : 'border-gray-700 bg-gray-800/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <h4 className={`font-semibold ${achievement.unlocked ? 
                      achievement.rarity === 'legendary' ? 'text-purple-400' :
                      achievement.rarity === 'epic' ? 'text-orange-400' :
                      achievement.rarity === 'rare' ? 'text-blue-400' :
                      'text-green-400' : 'text-gray-500'}`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">{achievement.description}</p>
                    <div className={`text-xs font-bold mt-1 ${
                      achievement.rarity === 'legendary' ? 'text-purple-400' :
                      achievement.rarity === 'epic' ? 'text-orange-400' :
                      achievement.rarity === 'rare' ? 'text-blue-400' :
                      'text-green-400'
                    }`}>
                      {achievement.rarity.toUpperCase()}
                    </div>
                    {!achievement.unlocked && (
                      <div className="mt-2">
                        <div className="bg-gray-700 rounded-full h-1">
                          <div 
                            className="bg-yellow-500 h-1 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(((userProfile?.streak || 0) / achievement.requirement) * 100, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{userProfile?.streak}/{achievement.requirement}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Outras views permanecem iguais, mas agora com dados do userProfile */}
        {currentView === 'mentor' && (
          <div className="space-y-6">
            {/* AI Mentor Header */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h2 className="text-2xl font-bold text-purple-400 mb-2">X-Mentor IA</h2>
              <p className="text-gray-300">Seu coach pessoal de IA sempre disponível</p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Online 24/7</span>
              </div>
            </div>

            {/* Quick Chat */}
            <button 
              onClick={() => setShowMentorChat(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              💬 CONVERSAR COM X-MENTOR AGORA
            </button>

            {/* Daily Motivation */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-purple-400 mb-4">💬 Mensagem Personalizada</h3>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                <p className="text-white italic">
                  "Olá {userProfile?.name}! Você está no dia {userProfile?.streak} da sua jornada - isso é incrível! Baseado no seu perfil, vejo que você tem {userProfile?.energy}/10 de energia hoje. Recomendo focar em exercícios físicos para canalizar essa energia positivamente. Lembre-se: cada momento de resistência fortalece sua disciplina mental."
                </p>
                <div className="mt-3 text-sm text-purple-300">
                  🧠 Análise baseada em IA • Atualizada em tempo real
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Adicione outras views aqui conforme necessário */}
      </div>
    </div>
  )
}