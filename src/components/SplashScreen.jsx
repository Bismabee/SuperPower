import { Zap } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center z-50">
      <div className="text-center space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="bg-yellow-400 p-6 rounded-3xl shadow-2xl animate-bounce-slow">
            <Zap size={64} strokeWidth={2.5} className="text-white" fill="currentColor" />
          </div>
        </div>

        {/* Greeting */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-white animate-slide-up">
            Hello Shakir
          </h1>
          <p className="text-xl text-blue-100 animate-slide-up-delay">
            Welcome to SuperPower
          </p>
        </div>

        {/* Loader */}
        <div className="flex justify-center space-x-2 animate-fade-in-delay">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse-dot" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse-dot" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse-dot" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}

