import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  CreditCard, 
  Lock, 
  Search, 
  User, 
  DollarSign, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Globe, 
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 8);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <User className="w-8 h-8" />,
      title: "User Registration & Authentication",
      description: "Secure JWT-based authentication system with seamless user onboarding",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Advanced Security",
      description: "Military-grade password hashing and encryption for maximum protection",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Instant Account Setup",
      description: "Automatic account creation with random initial balance to get you started",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-time Balance View",
      description: "Protected routes ensuring only you can view your account balance",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Secure Fund Transfers",
      description: "Transfer money between accounts with comprehensive validation",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Profile Management",
      description: "Easy-to-use interface for updating your personal information",
      color: "from-teal-500 to-blue-500"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart User Search",
      description: "Powerful bulk filtering to find and connect with other users",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Robust Error Handling",
      description: "Comprehensive error management with clear status codes",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "256-bit", label: "Encryption" },
    { number: "<1s", label: "Transfer Time" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen  text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 backdrop-blur-sm bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PaySecure
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#security" className="text-gray-300 hover:text-white transition-colors">Security</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <button 
              onClick={() => setShowLoginForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Future of
              <br />
              <span className="relative text-white">
                Digital Payments
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience lightning-fast, secure transactions with our next-generation payment platform. 
              Built with cutting-edge technology for the modern world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate("/register")}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
            onClick={()=>navigate(("/login"))}
              className="border-2 border-gray-600 hover:border-purple-500 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-purple-500/10">
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need for secure, efficient, and user-friendly digital payments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:transform hover:scale-105 ${activeFeature === index ? 'ring-2 ring-purple-500 scale-105' : ''}`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="relative z-10 px-6 py-20 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Bank-Grade Security
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Your security is our top priority. We use the latest encryption technologies 
                and security protocols to protect your financial data.
              </p>
              <div className="space-y-4">
                {[
                  "256-bit SSL encryption",
                  "Multi-factor authentication",
                  "Real-time fraud detection",
                  "Secure JWT token management"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-gray-700">
                <div className="grid grid-cols-3 gap-4">
                  {[Shield, Lock, CheckCircle, Globe, Zap, Star, Users, CreditCard, Eye].map((Icon, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:bg-gray-700/50 transition-colors">
                      <Icon className="w-8 h-8 text-purple-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Transform Your Payments?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust PaySecure for their digital transactions
          </p>
          <button 
            onClick={() => setShowLoginForm(true)}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-10 py-5 rounded-xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PaySecure
            </span>
          </div>
          <p className="text-gray-400 mb-6">
            Secure, fast, and reliable digital payments for everyone.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}