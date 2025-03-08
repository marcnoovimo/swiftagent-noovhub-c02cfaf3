
import React, { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user } = useAuth();

  // Rediriger si déjà connecté
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Vérifier le domaine de l'email
      if (!email.toLowerCase().endsWith('@noovimo.fr')) {
        toast.error('Veuillez utiliser une adresse email @noovimo.fr.');
        setIsLoading(false);
        return;
      }
      
      const { error } = await signIn(email, password);
      
      if (error) {
        toast.error('Identifiants incorrects. Veuillez réessayer.');
      } else {
        toast.success('Connexion réussie! Bienvenue sur l\'intranet Noovimo.');
        navigate('/');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la connexion.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-noovimo-50 to-white">
      <div className="w-full max-w-md animate-scale-in">
        <div className="glass-card rounded-2xl p-8 shadow-medium">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Intranet Noovimo</h1>
            <p className="text-sm text-muted-foreground mt-2">Connectez-vous pour accéder à votre espace</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@noovimo.fr"
                className="w-full rounded-lg border border-input px-4 py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-input px-4 py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">
                  Rester connecté
                </label>
              </div>
              
              <Link to="/forgot-password" className="text-sm font-medium text-noovimo-600 hover:text-noovimo-700">
                Mot de passe oublié?
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-noovimo-500 hover:bg-noovimo-600 text-white rounded-lg px-4 py-2.5 font-medium transition-colors disabled:bg-noovimo-300"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn size={18} className="mr-2" />
                  Se connecter
                </span>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>© 2023 Noovimo. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
