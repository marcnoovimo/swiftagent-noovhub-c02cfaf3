
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, KeyRound, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Récupérer le hash de l'URL
  useEffect(() => {
    const handleHashChange = async () => {
      // En mode démo, on ne vérifie pas le hash
      if (!isSupabaseConfigured) {
        return;
      }
      
      const hash = window.location.hash;
      if (hash && hash.includes('type=recovery')) {
        // Le hash est valide
      } else {
        toast.error("Lien de réinitialisation invalide ou expiré");
        navigate('/login');
      }
    };

    handleHashChange();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    
    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (!isSupabaseConfigured) {
        // En mode démo, on simule la réinitialisation
        setTimeout(() => {
          toast.success("Mot de passe réinitialisé avec succès (mode démo)");
          navigate('/login');
        }, 1000);
        return;
      }
      
      const { error } = await supabase.auth.updateUser({ 
        password: password 
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Mot de passe réinitialisé avec succès");
        // Rediriger vers la page de connexion après 2 secondes
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-noovimo-50 to-white">
      <div className="w-full max-w-md animate-scale-in">
        <div className="glass-card rounded-2xl p-8 shadow-medium">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <KeyRound size={28} className="text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Nouveau mot de passe</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Créez un nouveau mot de passe sécurisé
            </p>
          </div>
          
          {!isSupabaseConfigured && (
            <Alert className="mb-6 bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-sm text-amber-800">
                Mode démo activé. La réinitialisation est simulée et ne fonctionnera pas réellement.
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Nouveau mot de passe
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
              <p className="text-xs text-muted-foreground mt-1">
                Au moins 8 caractères, incluant chiffres et lettres
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-input px-4 py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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
                  Mise à jour...
                </span>
              ) : (
                <span>Réinitialiser le mot de passe</span>
              )}
            </button>
            
            <div className="mt-4">
              <Link to="/login" 
                className="flex items-center justify-center gap-2 w-full text-center text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft size={16} />
                Retour à la page de connexion
              </Link>
            </div>
          </form>
          
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>© 2023 Noovimo. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
