import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('employe@entreprise.fr');
  const [password, setPassword] = useState<string>('password');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Identifiants invalides. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const carouselItems = [
    {
      title: "Collaboration d'équipe",
      description: "Communiquez facilement avec vos collègues et restez informé des activités de l'équipe."
    },
    {
      title: "Gestion des congés",
      description: "Demandez et suivez vos congés en quelques clics. Visualisez le statut en temps réel."
    },
    {
      title: "Actualités d'entreprise",
      description: "Restez à jour avec les dernières actualités et annonces importantes de l'entreprise."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-700 mb-2">Intranet Entreprise</h1>
            <p className="text-neutral-600">Plateforme interne de collaboration</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-800 mb-6">Connexion</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-neutral-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full py-2 px-4 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="votre.email@entreprise.fr"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-neutral-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full py-2 px-4 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Votre mot de passe"
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isLoading}
                rightIcon={<ArrowRight size={18} />}
              >
                Se connecter
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-primary-600 hover:text-primary-800">
                Mot de passe oublié ?
              </a>
            </div>
          </div>
          
          <div className="text-center mt-8 text-xs text-neutral-500">
            <p>Identifiants de démonstration :</p>
            <p className="mt-1">Employé : employe@entreprise.fr / password</p>
            <p>Superviseur : superviseur@entreprise.fr / password</p>
          </div>
        </motion.div>
      </div>
      
      {/* Right side - Banner */}
      <div className="hidden lg:flex w-1/2 bg-primary-700 text-white p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold mb-6"
          >
            Bienvenue sur votre espace collaboratif
          </motion.h2>
          
          <div className="space-y-8">
            {carouselItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.2) }}
                className="bg-primary-600 bg-opacity-30 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-primary-100">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;