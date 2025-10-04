'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { X, Shield, Users, Brain, Trophy, Zap } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="text-center flex-1">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              X
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-yellow-400 bg-clip-text text-transparent">
              NOFAPX
            </h2>
            <p className="text-gray-400 text-sm mt-2">Entre na sua jornada de libertação</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Benefits */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Progresso sincronizado em todos os dispositivos</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <Users className="w-4 h-4 text-green-400" />
            <span>Acesso à comunidade global de guerreiros</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>X-Mentor IA personalizado para você</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>Conquistas e ranking global</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <Zap className="w-4 h-4 text-orange-400" />
            <span>Todas as funcionalidades premium liberadas!</span>
          </div>
        </div>

        {/* Auth Component */}
        <div className="auth-container">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#06b6d4',
                    brandAccent: '#0891b2',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#374151',
                    defaultButtonBackgroundHover: '#4b5563',
                    inputBackground: '#1f2937',
                    inputBorder: '#374151',
                    inputBorderHover: '#06b6d4',
                    inputBorderFocus: '#06b6d4',
                    inputText: 'white',
                    inputLabelText: '#d1d5db',
                    inputPlaceholder: '#9ca3af',
                  },
                  space: {
                    spaceSmall: '4px',
                    spaceMedium: '8px',
                    spaceLarge: '16px',
                    labelBottomMargin: '8px',
                    anchorBottomMargin: '4px',
                    emailInputSpacing: '4px',
                    socialAuthSpacing: '4px',
                    buttonPadding: '10px 15px',
                    inputPadding: '10px 15px',
                  },
                  fontSizes: {
                    baseBodySize: '14px',
                    baseInputSize: '14px',
                    baseLabelSize: '14px',
                    baseButtonSize: '14px',
                  },
                  fonts: {
                    bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    inputFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    labelFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '8px',
                    buttonBorderRadius: '8px',
                    inputBorderRadius: '8px',
                  },
                },
              },
              className: {
                container: 'auth-container',
                button: 'auth-button',
                input: 'auth-input',
                label: 'auth-label',
              },
            }}
            providers={['google', 'github']}
            redirectTo={`${window.location.origin}/auth/callback`}
            onlyThirdPartyProviders={false}
            magicLink={true}
            showLinks={true}
            localization={{
              variables: {
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'Seu email',
                  password_input_placeholder: 'Sua senha',
                  button_label: 'Criar Conta',
                  loading_button_label: 'Criando conta...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Não tem uma conta? Cadastre-se',
                  confirmation_text: 'Verifique seu email para confirmar a conta',
                },
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'Seu email',
                  password_input_placeholder: 'Sua senha',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre',
                },
                magic_link: {
                  email_input_label: 'Email',
                  email_input_placeholder: 'Seu email',
                  button_label: 'Enviar link mágico',
                  loading_button_label: 'Enviando link...',
                  link_text: 'Enviar um link mágico por email',
                  confirmation_text: 'Verifique seu email para o link de acesso',
                },
                forgotten_password: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'Seu email',
                  button_label: 'Enviar instruções',
                  loading_button_label: 'Enviando instruções...',
                  link_text: 'Esqueceu sua senha?',
                  confirmation_text: 'Verifique seu email para redefinir a senha',
                },
              },
            }}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Ao criar uma conta, você concorda com nossos{' '}
            <a href="#" className="text-cyan-400 hover:underline">Termos de Uso</a>{' '}
            e{' '}
            <a href="#" className="text-cyan-400 hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </div>

      <style jsx global>{`
        .auth-container {
          width: 100%;
        }
        
        .auth-container .supabase-auth-ui_ui {
          background: transparent;
        }
        
        .auth-container button[type="submit"] {
          background: linear-gradient(to right, #06b6d4, #3b82f6) !important;
          border: none !important;
          font-weight: 600 !important;
          transition: all 0.3s ease !important;
        }
        
        .auth-container button[type="submit"]:hover {
          background: linear-gradient(to right, #0891b2, #2563eb) !important;
          transform: translateY(-1px);
        }
        
        .auth-container input {
          background: #1f2937 !important;
          border: 1px solid #374151 !important;
          color: white !important;
        }
        
        .auth-container input:focus {
          border-color: #06b6d4 !important;
          box-shadow: 0 0 0 1px #06b6d4 !important;
        }
        
        .auth-container label {
          color: #d1d5db !important;
          font-weight: 500 !important;
        }
        
        .auth-container a {
          color: #06b6d4 !important;
        }
        
        .auth-container a:hover {
          color: #0891b2 !important;
        }
        
        .auth-container .supabase-auth-ui_ui-message {
          background: #1f2937 !important;
          border: 1px solid #374151 !important;
          color: #d1d5db !important;
        }
        
        .auth-container .supabase-auth-ui_ui-message--error {
          background: #7f1d1d !important;
          border-color: #dc2626 !important;
          color: #fca5a5 !important;
        }
        
        .auth-container .supabase-auth-ui_ui-message--success {
          background: #14532d !important;
          border-color: #16a34a !important;
          color: #86efac !important;
        }
      `}</style>
    </div>
  )
}