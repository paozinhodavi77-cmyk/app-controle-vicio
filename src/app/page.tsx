"use client"

import { useState, useEffect } from 'react'
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
  Bluetooth as BluetoothIcon
} from 'lucide-react'

interface User {
  name: string
  streak: number
  level: number
  xp: number
  avatar: string
  joinDate: string
  goals: string[]
  totalDaysClean: number
  longestStreak: number
  relapses: number
  mood: number
  energy: number
  productivity: number
  confidence: number
  premiumUntil: string
}

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
  const [currentView, setCurrentView] = useState<'dashboard' | 'onboarding' | 'mentor' | 'community' | 'growth' | 'premium' | 'blocker' | 'analytics' | 'emergency' | 'workshops' | 'habits'>('onboarding')
  const [user, setUser] = useState<User>({
    name: '',
    streak: 0,
    level: 1,
    xp: 0,
    avatar: '🦅',
    joinDate: new Date().toISOString().split('T')[0],
    goals: [],
    totalDaysClean: 0,
    longestStreak: 0,
    relapses: 0,
    mood: 7,
    energy: 8,
    productivity: 6,
    confidence: 7,
    premiumUntil: '2025-12-31' // Premium liberado para todos!
  })
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
    { id: '1', title: 'Primeiro Passo', description: '1 dia limpo', icon: '🌱', unlocked: user.streak >= 1, requirement: 1, category: 'streak', rarity: 'common' },
    { id: '2', title: 'Guerreiro Iniciante', description: '7 dias limpos', icon: '⚔️', unlocked: user.streak >= 7, requirement: 7, category: 'streak', rarity: 'common' },
    { id: '3', title: 'Disciplinado', description: '30 dias limpos', icon: '🏆', unlocked: user.streak >= 30, requirement: 30, category: 'streak', rarity: 'rare' },
    { id: '4', title: 'Campeão', description: '90 dias limpos', icon: '👑', unlocked: user.streak >= 90, requirement: 90, category: 'streak', rarity: 'epic' },
    { id: '5', title: 'Lenda Imortal', description: '365 dias limpos', icon: '⚡', unlocked: user.streak >= 365, requirement: 365, category: 'streak', rarity: 'legendary' },
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

  const motivationalQuotes = [
    "Você é mais forte do que seus impulsos.",
    "Cada dia limpo é uma vitória.",
    "A disciplina é a ponte entre metas e conquistas.",
    "Sua jornada de libertação começa agora.",
    "Transforme sua dor em poder.",
    "O guerreiro não nasce, ele se forja na batalha.",
    "Sua força interior é infinita.",
    "Cada 'não' te torna mais forte."
  ]

  const completeMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId)
    if (mission && !mission.completed) {
      mission.completed = true
      setUser(prev => ({ 
        ...prev, 
        xp: prev.xp + mission.xp,
        level: Math.floor((prev.xp + mission.xp) / 500) + 1
      }))
    }
  }

  const handleOnboardingNext = () => {
    if (onboardingStep < 3) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      setCurrentView('dashboard')
    }
  }

  const startJourney = () => {
    setUser(prev => ({ ...prev, goals: selectedGoals, streak: 1 }))
    setCurrentView('dashboard')
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
    if (chatInput.trim()) {
      const newMessage: MentorMessage = {
        id: Date.now().toString(),
        type: 'guidance',
        title: 'Resposta do X-Mentor',
        message: `Entendo sua situação, ${user.name}. Baseado no que você disse: "${chatInput}", recomendo focar na respiração profunda e lembrar dos seus objetivos. Você já percorreu ${user.streak} dias - isso é prova da sua força interior. Continue firme!`,
        timestamp: new Date().toLocaleTimeString(),
        priority: 'medium'
      }
      setMentorMessages(prev => [newMessage, ...prev])
      setChatInput('')
    }
  }

  if (currentView === 'onboarding') {
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
                <h2 className="text-2xl font-bold text-cyan-400">Bem-vindo, Guerreiro!</h2>
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
                onClick={handleOnboardingNext}
                disabled={selectedGoals.length === 0}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar ({selectedGoals.length} selecionados)
              </button>
            </div>
          )}

          {onboardingStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">Seu Nome de Guerra</h2>
                <p className="text-gray-400">Como devemos te chamar, guerreiro?</p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Digite seu nome..."
                  value={user.name}
                  onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none text-lg"
                />

                <div className="bg-gray-900 rounded-2xl p-6 border border-yellow-500/20">
                  <h3 className="text-lg font-semibold mb-3 text-yellow-400">⚡ Escolha seu Avatar</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {['🦅', '🦁', '🐺', '🔥', '⚡', '🗡️', '🛡️', '👑', '💎', '🚀', '⭐', '🌟'].map((avatar) => (
                      <button
                        key={avatar}
                        onClick={() => setUser(prev => ({ ...prev, avatar }))}
                        className={`text-3xl p-3 rounded-xl border-2 transition-all duration-300 ${
                          user.avatar === avatar
                            ? 'border-yellow-500 bg-yellow-500/10'
                            : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={handleOnboardingNext}
                disabled={!user.name.trim()}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Finalizar Setup
              </button>
            </div>
          )}

          {onboardingStep === 3 && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="text-6xl">{user.avatar}</div>
                <h2 className="text-2xl font-bold text-cyan-400">Pronto, {user.name}!</h2>
                <p className="text-gray-300 text-lg">
                  Sua jornada de libertação começa agora. Cada dia é uma batalha, cada vitória te torna mais forte.
                </p>
              </div>

              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">🎯 Seus Objetivos</h3>
                <div className="space-y-2">
                  {selectedGoals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={startJourney}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-black py-4 rounded-2xl font-bold text-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                🚀 INICIAR JORNADA
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
                    <p>Olá {user.name}! Como posso te ajudar hoje?</p>
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
            <div className="text-2xl">{user.avatar}</div>
            <div>
              <h2 className="font-bold text-cyan-400">{user.name || 'Guerreiro'}</h2>
              <p className="text-sm text-gray-400">Nível {user.level} • {user.xp} XP</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right mr-2">
              <div className="text-sm font-bold text-green-400">{currentTime.toLocaleTimeString()}</div>
              <div className="text-xs text-gray-400">Dia {user.streak}</div>
            </div>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
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
                <div className="text-3xl font-bold text-cyan-400">{user.streak}</div>
                <p className="text-sm text-gray-400">Dias Limpos</p>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-green-400">{user.level}</div>
                <p className="text-sm text-gray-400">Nível</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-yellow-400">{user.xp}</div>
                <p className="text-sm text-gray-400">XP Total</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-400">{user.longestStreak}</div>
                <p className="text-sm text-gray-400">Recorde</p>
              </div>
            </div>

            {/* Mood & Energy Tracker */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-cyan-400 mb-4">📊 Estado Atual</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Humor', value: user.mood, color: 'blue', icon: '😊' },
                  { label: 'Energia', value: user.energy, color: 'green', icon: '⚡' },
                  { label: 'Produtividade', value: user.productivity, color: 'purple', icon: '🎯' },
                  { label: 'Confiança', value: user.confidence, color: 'yellow', icon: '💪' }
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
                            style={{ width: `${Math.min((user.streak / achievement.requirement) * 100, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{user.streak}/{achievement.requirement}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {currentView === 'emergency' && (
          <div className="space-y-6">
            {/* Emergency Header */}
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🚨</div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">Centro de Emergência</h2>
              <p className="text-gray-300">Técnicas científicas para momentos críticos</p>
            </div>

            {/* Quick SOS */}
            <button 
              onClick={() => setShowSOS(true)}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🆘 ATIVAR MODO SOS AGORA
            </button>

            {/* Emergency Techniques */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-red-400 mb-4">⚡ Técnicas de Emergência</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyTechniques.map((technique) => (
                  <div key={technique.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-white">{technique.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                        technique.type === 'breathing' ? 'bg-blue-500/20 text-blue-400' :
                        technique.type === 'physical' ? 'bg-green-500/20 text-green-400' :
                        technique.type === 'mental' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {technique.type.toUpperCase()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{technique.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        ⏱️ {technique.duration} • 📊 {technique.effectiveness}% eficácia
                      </div>
                      <button 
                        onClick={() => startEmergencyTechnique(technique)}
                        className={`px-3 py-1 rounded-lg font-semibold text-sm transition-colors ${
                          technique.type === 'breathing' ? 'bg-blue-600 hover:bg-blue-700' :
                          technique.type === 'physical' ? 'bg-green-600 hover:bg-green-700' :
                          technique.type === 'mental' ? 'bg-purple-600 hover:bg-purple-700' :
                          'bg-orange-600 hover:bg-orange-700'
                        }`}
                      >
                        Iniciar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-red-400 mb-4">📞 Contatos de Emergência</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-400" />
                    <span className="font-medium">Parceiro de Responsabilidade</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">Chat da Irmandade</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <Headphones className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">Linha de Apoio 24h</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        )}

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
                  "Olá {user.name}! Você está no dia {user.streak} da sua jornada - isso é incrível! Baseado no seu perfil, vejo que você tem {user.energy}/10 de energia hoje. Recomendo focar em exercícios físicos para canalizar essa energia positivamente. Lembre-se: cada momento de resistência fortalece sua disciplina mental."
                </p>
                <div className="mt-3 text-sm text-purple-300">
                  🧠 Análise baseada em IA • Atualizada em tempo real
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-purple-400 mb-4">🧠 Insights Inteligentes</h3>
              <div className="space-y-3">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-bold text-blue-400">Padrão de Risco Detectado</span>
                  </div>
                  <p className="text-sm text-blue-300">
                    Você tem 73% mais dificuldades entre 22h-24h. Sugestão: crie uma rotina relaxante 1h antes de dormir.
                  </p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-bold text-green-400">Força Identificada</span>
                  </div>
                  <p className="text-sm text-green-300">
                    Exercícios físicos aumentam sua resistência em 89%. Continue priorizando atividades físicas diárias.
                  </p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-bold text-yellow-400">Recomendação Personalizada</span>
                  </div>
                  <p className="text-sm text-yellow-300">
                    Baseado no seu progresso, adicione meditação matinal para aumentar o autocontrole em 45%.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium AI Features */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-purple-400 mb-4">🎧 Recursos Premium IA (LIBERADOS!)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <Headphones className="w-5 h-5 text-green-400" />
                    <span className="font-medium">Áudios Motivacionais IA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Unlock className="w-4 h-4 text-green-400" />
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
                
                <button className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">Análise Comportamental</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Unlock className="w-4 h-4 text-green-400" />
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
                
                <button className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">Coaching Personalizado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Unlock className="w-4 h-4 text-green-400" />
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
                
                <button className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">Alertas Preditivos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Unlock className="w-4 h-4 text-green-400" />
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'community' && (
          <div className="space-y-6">
            {/* Community Header */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">Irmandade NoFapX</h2>
              <p className="text-gray-300">Unidos somos mais fortes</p>
              <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">12,847</div>
                  <div className="text-xs text-gray-400">Membros Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">3,291</div>
                  <div className="text-xs text-gray-400">Online Agora</div>
                </div>
              </div>
            </div>

            {/* Global Ranking */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Ranking Global - Top Guerreiros
              </h3>
              
              <div className="space-y-3">
                {communityMembers.map((member, index) => (
                  <div 
                    key={member.id}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      member.name === (user.name || 'Você')
                        ? 'bg-cyan-500/10 border border-cyan-500/20'
                        : 'bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="text-2xl">{member.avatar}</div>
                        {member.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-white">{member.name}</p>
                          <span className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">{member.country}</span>
                        </div>
                        <p className="text-sm text-gray-400">Nível {member.level} • {member.joinedDays} dias na comunidade</p>
                        <p className="text-xs text-gray-500">{member.isOnline ? '🟢 Online' : `🔴 ${member.lastSeen}`}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">{member.streak} dias</p>
                      <p className="text-sm text-gray-400">#{index + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brotherhood Groups */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-green-400 mb-4">🛡️ Grupos de Irmandade</h3>
              
              <div className="space-y-3">
                <div className="p-4 bg-gray-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">Guerreiros da Madrugada 🌙</h4>
                    <span className="text-sm text-green-400">47/50 membros</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Grupo focado em vencer os desafios noturnos • 234 mensagens hoje</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {['🦅', '🔥', '⚡', '🛡️', '👑'].map((avatar, i) => (
                        <div key={i} className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs border-2 border-gray-800">
                          {avatar}
                        </div>
                      ))}
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition-colors">
                      Participar
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">Atletas da Disciplina 💪</h4>
                    <span className="text-sm text-green-400">32/40 membros</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Combinando exercícios físicos com autocontrole • 156 mensagens hoje</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {['🦁', '🚀', '💎', '⚔️', '🌟'].map((avatar, i) => (
                        <div key={i} className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs border-2 border-gray-800">
                          {avatar}
                        </div>
                      ))}
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition-colors">
                      Participar
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">Mestres da Mente 🧠</h4>
                    <span className="text-sm text-green-400">28/30 membros</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Foco em meditação, mindfulness e força mental • 89 mensagens hoje</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {['🧙', '🔮', '🎯', '🌀', '✨'].map((avatar, i) => (
                        <div key={i} className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs border-2 border-gray-800">
                          {avatar}
                        </div>
                      ))}
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition-colors">
                      Participar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-green-400 mb-4">💬 Chat Global da Irmandade</h3>
              
              <div className="bg-gray-800 rounded-xl p-4 h-40 overflow-y-auto mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-cyan-400 font-bold">Phoenix_Rising:</span>
                    <span className="text-gray-300">Dia 89 aqui! Quem mais está na luta hoje? 💪</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-400 font-bold">Steel_Mind:</span>
                    <span className="text-gray-300">Dia 76! Vamos juntos, irmão! 🔥</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-yellow-400 font-bold">Night_Guardian:</span>
                    <span className="text-gray-300">Acabei de completar meu treino. Energia lá em cima! ⚡</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-400 font-bold">Diamond_Soul:</span>
                    <span className="text-gray-300">Dia 234! A jornada vale cada segundo. Força, guerreiros! 👑</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Digite sua mensagem para a irmandade..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                />
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition-colors">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'workshops' && (
          <div className="space-y-6">
            {/* Workshops Header */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🎓</div>
              <h2 className="text-2xl font-bold text-blue-400 mb-2">Workshops & Eventos</h2>
              <p className="text-gray-300">Aprenda com especialistas e veteranos</p>
            </div>

            {/* Live Now */}
            <div className="bg-red-900/20 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-bold text-red-400">🔴 AO VIVO AGORA</h3>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="font-bold text-white mb-2">Vencendo Gatilhos Noturnos</h4>
                <p className="text-gray-300 text-sm mb-3">Com Dr. Carlos Mendes • 234 participantes assistindo</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-400">⏱️ 45 min restantes</span>
                    <span className="text-sm text-gray-400">👥 234/500</span>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-bold transition-colors">
                    ASSISTIR AO VIVO
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Workshops */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-blue-400 mb-4">📅 Próximos Workshops</h3>
              
              <div className="space-y-4">
                {workshops.filter(w => !w.isLive).map((workshop) => (
                  <div key={workshop.id} className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">{workshop.title}</h4>
                        <p className="text-gray-300 text-sm mb-2">{workshop.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>👨‍🏫 {workshop.instructor}</span>
                          <span>📅 {new Date(workshop.date).toLocaleDateString()}</span>
                          <span>⏰ {workshop.time}</span>
                          <span>⏱️ {workshop.duration}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        workshop.category === 'psychology' ? 'bg-purple-500/20 text-purple-400' :
                        workshop.category === 'fitness' ? 'bg-green-500/20 text-green-400' :
                        workshop.category === 'productivity' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-pink-500/20 text-pink-400'
                      }`}>
                        {workshop.category.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">👥 {workshop.attendees}/{workshop.maxAttendees}</span>
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(workshop.attendees / workshop.maxAttendees) * 100}%` }}
                          />
                        </div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors">
                        Inscrever-se
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workshop Categories */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-blue-400 mb-4">🎯 Categorias de Workshops</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Psicologia', icon: '🧠', color: 'purple', count: 12 },
                  { name: 'Fitness', icon: '💪', color: 'green', count: 8 },
                  { name: 'Produtividade', icon: '🎯', color: 'blue', count: 15 },
                  { name: 'Relacionamentos', icon: '❤️', color: 'pink', count: 6 }
                ].map((category, index) => (
                  <div key={index} className={`bg-${category.color}-500/10 border border-${category.color}-500/20 rounded-xl p-4 text-center`}>
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h4 className={`font-bold text-${category.color}-400 mb-1`}>{category.name}</h4>
                    <p className="text-sm text-gray-400">{category.count} workshops</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Workshop Access */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold text-yellow-400">Acesso Premium Liberado!</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Unlock className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Todos os workshops gravados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Unlock className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Sessões 1:1 com especialistas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Unlock className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Material exclusivo de apoio</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Unlock className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Certificados de participação</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'blocker' && (
          <div className="space-y-6">
            {/* Blocker Header */}
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">Bloqueador Inteligente</h2>
              <p className="text-gray-300">Proteção avançada contra gatilhos</p>
            </div>

            {/* Blocker Status */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-red-400">Status do Bloqueador</h3>
                <button 
                  onClick={() => setIsBlockerActive(!isBlockerActive)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    isBlockerActive 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {isBlockerActive ? '🟢 ATIVO' : '🔴 INATIVO'}
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">1,247</div>
                  <div className="text-sm text-gray-400">Sites Bloqueados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">89</div>
                  <div className="text-sm text-gray-400">Tentativas Hoje</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">99.7%</div>
                  <div className="text-sm text-gray-400">Taxa de Bloqueio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">24/7</div>
                  <div className="text-sm text-gray-400">Proteção Ativa</div>
                </div>
              </div>
            </div>

            {/* AI-Powered Features */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-red-400 mb-4">🤖 Recursos IA (LIBERADOS!)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-5 h-5 text-blue-400" />
                    <h4 className="font-bold text-white">Detecção Visual IA</h4>
                    <Unlock className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-400">Analisa imagens em tempo real para detectar conteúdo inadequado</p>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <h4 className="font-bold text-white">Análise Comportamental</h4>
                    <Unlock className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-400">Aprende seus padrões e previne acessos em momentos de risco</p>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <h4 className="font-bold text-white">Bloqueio Adaptativo</h4>
                    <Unlock className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-400">Ajusta automaticamente o nível de proteção baseado no seu estado</p>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h4 className="font-bold text-white">Alertas Preditivos</h4>
                    <Unlock className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-400">Avisa antes que você acesse conteúdo de risco</p>
                </div>
              </div>
            </div>

            {/* Blocked Sites Today */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-red-400 mb-4">🚫 Sites Bloqueados Hoje</h3>
              
              <div className="space-y-3">
                {[
                  { domain: 'site-adulto-1.com', category: 'Adulto', attempts: 12, time: '14:23' },
                  { domain: 'rede-social-gatilho.com', category: 'Social', attempts: 8, time: '16:45' },
                  { domain: 'site-adulto-2.com', category: 'Adulto', attempts: 15, time: '20:12' },
                  { domain: 'forum-inadequado.com', category: 'Forum', attempts: 3, time: '22:30' }
                ].map((site, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-white">{site.domain}</p>
                        <p className="text-sm text-gray-400">{site.category} • Última tentativa: {site.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-400">{site.attempts}</p>
                      <p className="text-xs text-gray-400">tentativas</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Blocking Rules */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-red-400 mb-4">⚙️ Configurações Avançadas</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Modo Stealth</h4>
                    <p className="text-sm text-gray-400">Bloqueia sem mostrar notificações</p>
                  </div>
                  <button className="bg-green-600 px-3 py-1 rounded-lg text-sm font-semibold">ATIVO</button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Bloqueio por Horário</h4>
                    <p className="text-sm text-gray-400">Proteção extra entre 22h-6h</p>
                  </div>
                  <button className="bg-green-600 px-3 py-1 rounded-lg text-sm font-semibold">ATIVO</button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Bloqueio de Apps</h4>
                    <p className="text-sm text-gray-400">Bloqueia aplicativos móveis</p>
                  </div>
                  <button className="bg-green-600 px-3 py-1 rounded-lg text-sm font-semibold">ATIVO</button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Modo Emergência</h4>
                    <p className="text-sm text-gray-400">Bloqueio total por 24h</p>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm font-semibold transition-colors">
                    ATIVAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">📊</div>
              <h2 className="text-2xl font-bold text-blue-400 mb-2">Analytics Avançados</h2>
              <p className="text-gray-300">Insights detalhados da sua jornada</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-green-400">{user.streak}</div>
                <p className="text-sm text-gray-400">Streak Atual</p>
                <p className="text-xs text-green-300">+{user.streak > 0 ? 1 : 0} hoje</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">87%</div>
                <p className="text-sm text-gray-400">Taxa de Sucesso</p>
                <p className="text-xs text-blue-300">+5% este mês</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-400">156</div>
                <p className="text-sm text-gray-400">Dias Totais</p>
                <p className="text-xs text-purple-300">Limpos</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-yellow-400">92%</div>
                <p className="text-sm text-gray-400">Melhoria Geral</p>
                <p className="text-xs text-yellow-300">Todas as áreas</p>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-blue-400 mb-4">📈 Progresso dos Últimos 30 Dias</h3>
              
              <div className="h-40 bg-gray-800 rounded-xl p-4 flex items-end justify-between">
                {Array.from({ length: 30 }, (_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div 
                      className="w-2 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t"
                      style={{ height: `${Math.random() * 100 + 20}px` }}
                    />
                    {i % 5 === 0 && (
                      <span className="text-xs text-gray-400 mt-1">{30 - i}</span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">Dias Limpos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">Recaídas</span>
                </div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-blue-400 mb-4">🎯 Estatísticas Detalhadas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Evolução por Área</h4>
                  <div className="space-y-3">
                    {[
                      { area: 'Saúde Mental', before: 4, after: 8, color: 'blue' },
                      { area: 'Energia Física', before: 5, after: 9, color: 'green' },
                      { area: 'Produtividade', before: 3, after: 7, color: 'purple' },
                      { area: 'Relacionamentos', before: 4, after: 8, color: 'pink' },
                      { area: 'Autoestima', before: 3, after: 9, color: 'yellow' }
                    ].map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{stat.area}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{stat.before}/10</span>
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div 
                              className={`bg-${stat.color}-500 h-2 rounded-full`}
                              style={{ width: `${(stat.after / 10) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-white font-bold">{stat.after}/10</span>
                          <span className="text-xs text-green-400">+{stat.after - stat.before}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-3">Padrões Identificados</h4>
                  <div className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-bold text-green-400">Força</span>
                      </div>
                      <p className="text-xs text-green-300">Exercícios matinais aumentam resistência em 89%</p>
                    </div>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-bold text-yellow-400">Atenção</span>
                      </div>
                      <p className="text-xs text-yellow-300">Maior risco entre 22h-24h nos fins de semana</p>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Info className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-bold text-blue-400">Insight</span>
                      </div>
                      <p className="text-xs text-blue-300">Meditação reduz impulsos em 67% no mesmo dia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison with Community */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-blue-400 mb-4">🏆 Comparação com a Comunidade</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">Top 15%</div>
                  <p className="text-sm text-gray-400">Streak Atual</p>
                  <p className="text-xs text-green-300">Melhor que 85% dos usuários</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">Top 8%</div>
                  <p className="text-sm text-gray-400">Consistência</p>
                  <p className="text-xs text-blue-300">Melhor que 92% dos usuários</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">Top 5%</div>
                  <p className="text-sm text-gray-400">Crescimento</p>
                  <p className="text-xs text-purple-300">Melhor que 95% dos usuários</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'habits' && (
          <div className="space-y-6">
            {/* Habits Header */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">Rastreador de Hábitos</h2>
              <p className="text-gray-300">Construa uma vida extraordinária, um hábito por vez</p>
            </div>

            {/* Today's Habits */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-green-400 mb-4">✅ Hábitos de Hoje</h3>
              
              <div className="space-y-4">
                {habits.map((habit) => (
                  <div key={habit.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <button 
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          habit.completedToday 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-500 hover:border-green-400'
                        }`}
                      >
                        {habit.completedToday && <CheckCircle className="w-4 h-4 text-white" />}
                      </button>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${habit.completedToday ? 'text-green-400' : 'text-white'}`}>
                          {habit.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {habit.category} • Meta: {habit.target} {habit.unit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span className="font-bold text-orange-400">{habit.streak}</span>
                      </div>
                      <p className="text-xs text-gray-400">dias seguidos</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Habit Categories */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-green-400 mb-4">📊 Progresso por Categoria</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Corpo', completed: 2, total: 3, color: 'green', icon: '💪' },
                  { name: 'Mente', completed: 1, total: 2, color: 'blue', icon: '🧠' },
                  { name: 'Crescimento', completed: 1, total: 1, color: 'purple', icon: '📚' },
                  { name: 'Saúde', completed: 1, total: 2, color: 'red', icon: '❤️' }
                ].map((category, index) => (
                  <div key={index} className={`bg-${category.color}-500/10 border border-${category.color}-500/20 rounded-xl p-4 text-center`}>
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h4 className={`font-bold text-${category.color}-400 mb-1`}>{category.name}</h4>
                    <p className="text-sm text-gray-400">{category.completed}/{category.total} hoje</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className={`bg-${category.color}-500 h-2 rounded-full`}
                        style={{ width: `${(category.completed / category.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Overview */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-green-400 mb-4">📅 Visão Semanal</h3>
              
              <div className="overflow-x-auto">
                <div className="grid grid-cols-8 gap-2 min-w-full">
                  <div className="text-center text-sm font-semibold text-gray-400 p-2">Hábito</div>
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                    <div key={index} className="text-center text-sm font-semibold text-gray-400 p-2">{day}</div>
                  ))}
                  
                  {habits.slice(0, 4).map((habit, habitIndex) => (
                    <React.Fragment key={habit.id}>
                      <div className="text-sm text-white p-2 truncate">{habit.name}</div>
                      {Array.from({ length: 7 }, (_, dayIndex) => (
                        <div key={dayIndex} className="p-2 text-center">
                          <div className={`w-6 h-6 rounded-full mx-auto ${
                            Math.random() > 0.3 ? 'bg-green-500' : 'bg-gray-600'
                          }`} />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Add New Habit */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-green-400 mb-4">➕ Adicionar Novo Hábito</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Leitura Diária', icon: '📖', category: 'Crescimento' },
                  { name: 'Caminhada', icon: '🚶', category: 'Corpo' },
                  { name: 'Journaling', icon: '📝', category: 'Mente' },
                  { name: 'Vitaminas', icon: '💊', category: 'Saúde' },
                  { name: 'Alongamento', icon: '🤸', category: 'Corpo' },
                  { name: 'Podcast', icon: '🎧', category: 'Crescimento' },
                  { name: 'Respiração', icon: '🫁', category: 'Mente' },
                  { name: 'Hidratação', icon: '💧', category: 'Saúde' }
                ].map((suggestion, index) => (
                  <button key={index} className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors text-center">
                    <div className="text-2xl mb-2">{suggestion.icon}</div>
                    <h4 className="font-semibold text-white text-sm">{suggestion.name}</h4>
                    <p className="text-xs text-gray-400">{suggestion.category}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Habit Insights */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-green-400 mb-4">💡 Insights dos Hábitos</h3>
              
              <div className="space-y-3">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-bold text-blue-400">Tendência Positiva</span>
                  </div>
                  <p className="text-xs text-blue-300">Você está 23% mais consistente que no mês passado!</p>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Star className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-bold text-green-400">Melhor Hábito</span>
                  </div>
                  <p className="text-xs text-green-300">Leitura tem 95% de consistência - continue assim!</p>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Target className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-bold text-yellow-400">Oportunidade</span>
                  </div>
                  <p className="text-xs text-yellow-300">Adicionar meditação pode melhorar seu foco em 40%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'growth' && (
          <div className="space-y-6">
            {/* Growth Header */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h2 className="text-2xl font-bold text-orange-400 mb-2">Crescimento Integral</h2>
              <p className="text-gray-300">Desenvolva todas as áreas da sua vida</p>
            </div>

            {/* Growth Areas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
                <Brain className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-blue-400 mb-2">Mente</h3>
                <p className="text-sm text-gray-400 mb-4">Meditação, leitura, aprendizado</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
                <p className="text-xs text-gray-400">75% desenvolvido</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition-colors mt-3">
                  Explorar
                </button>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
                <Dumbbell className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-bold text-green-400 mb-2">Corpo</h3>
                <p className="text-sm text-gray-400 mb-4">Exercícios, nutrição, saúde</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
                <p className="text-xs text-gray-400">60% desenvolvido</p>
                <button className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold transition-colors mt-3">
                  Explorar
                </button>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
                <Briefcase className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-purple-400 mb-2">Carreira</h3>
                <p className="text-sm text-gray-400 mb-4">Produtividade, habilidades, metas</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }} />
                </div>
                <p className="text-xs text-gray-400">40% desenvolvido</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-semibold transition-colors mt-3">
                  Explorar
                </button>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
                <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <h3 className="font-bold text-pink-400 mb-2">Relacionamentos</h3>
                <p className="text-sm text-gray-400 mb-4">Social, família, comunicação</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '25%' }} />
                </div>
                <p className="text-xs text-gray-400">25% desenvolvido</p>
                <button className="w-full bg-pink-600 hover:bg-pink-700 py-2 rounded-lg font-semibold transition-colors mt-3">
                  Explorar
                </button>
              </div>
            </div>

            {/* Premium Content Unlocked */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold text-yellow-400">Conteúdo Premium Liberado!</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Unlock className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Programas de 30/60/90 dias</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Unlock className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Mentoria personalizada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Unlock className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Cursos especializados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Unlock className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Certificados de conclusão</span>
                </div>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-orange-400 mb-4">📊 Progresso Semanal</h3>
              
              <div className="space-y-4">
                {[
                  { area: 'Meditação', progress: 85, color: 'blue', sessions: 6, target: 7 },
                  { area: 'Exercícios', progress: 71, color: 'green', sessions: 5, target: 7 },
                  { area: 'Leitura', progress: 57, color: 'purple', sessions: 4, target: 7 },
                  { area: 'Networking', progress: 29, color: 'pink', sessions: 2, target: 7 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{item.area}</span>
                      <span className="text-gray-400">{item.sessions}/{item.target} sessões</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3">
                      <div 
                        className={`bg-${item.color}-500 h-3 rounded-full transition-all duration-500 relative`}
                        style={{ width: `${item.progress}%` }}
                      >
                        <div className="absolute right-0 top-0 h-full w-1 bg-white rounded-full opacity-80"></div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">{item.progress}% completo</span>
                      <span className={`text-xs text-${item.color}-400 font-semibold`}>
                        {item.progress >= 80 ? '🔥 Excelente!' : 
                         item.progress >= 60 ? '👍 Bom progresso' : 
                         '💪 Continue assim!'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Journal */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-orange-400 mb-4">📝 Diário de Crescimento</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Como foi seu dia?</label>
                  <textarea
                    placeholder="Descreva seus principais aprendizados e conquistas de hoje..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Principais desafios enfrentados:</label>
                  <textarea
                    placeholder="Quais obstáculos você superou hoje?"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none resize-none"
                    rows={2}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Metas para amanhã:</label>
                  <textarea
                    placeholder="O que você quer alcançar amanhã?"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none resize-none"
                    rows={2}
                  />
                </div>
              </div>
              
              <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 py-3 rounded-xl font-semibold transition-colors">
                💾 Salvar Reflexão Diária
              </button>
            </div>

            {/* Growth Challenges */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-orange-400 mb-4">🏆 Desafios de Crescimento</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Book className="w-5 h-5 text-blue-400" />
                    <h4 className="font-bold text-white">Desafio 30 Dias de Leitura</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Leia 20 páginas por dia durante 30 dias</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-blue-400">Dia 12/30</div>
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-sm font-semibold transition-colors">
                      Continuar
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Dumbbell className="w-5 h-5 text-green-400" />
                    <h4 className="font-bold text-white">Desafio Força Total</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Exercite-se 45 min por dia durante 21 dias</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-green-400">Dia 8/21</div>
                    <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-sm font-semibold transition-colors">
                      Continuar
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <h4 className="font-bold text-white">Mestre da Meditação</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Medite 15 minutos diários por 60 dias</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-purple-400">Dia 25/60</div>
                    <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg text-sm font-semibold transition-colors">
                      Continuar
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-pink-400" />
                    <h4 className="font-bold text-white">Conexões Sociais</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Converse com 1 pessoa nova por semana</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-pink-400">Semana 2/4</div>
                    <button className="bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded-lg text-sm font-semibold transition-colors">
                      Iniciar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}