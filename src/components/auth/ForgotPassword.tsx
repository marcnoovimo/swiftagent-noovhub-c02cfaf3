
import React, { useState } from 'react';
import { ArrowLeft, SendHorizontal, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { isSupabaseConfigured } from '@/lib/supabase';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword, demoMode } = useAuth();

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

      const { error } = await resetPassword(email);
      
      if (error && !demoMode) {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      } else {
        setIsSubmitted(true);
        toast.success("Instructions envoyées à votre adresse email.");
      }
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-noovimo-50 to-white">
        <div className="w-full max-w-md animate-scale-in">
          <div className="glass-card rounded-2xl p-4 sm:p-8 shadow-medium">
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <SendHorizontal size={24} className="text-green-600" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Email envoyé</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3 px-2">
                Nous avons envoyé un lien de réinitialisation à <strong className="break-all">{email}</strong>. 
                Veuillez vérifier votre boîte de réception.
              </p>
            </div>
            
            <div className="mt-4 sm:mt-6">
              <Link to="/login" 
                className="flex items-center justify-center gap-1 sm:gap-2 w-full text-center text-xs sm:text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft size={14} className="sm:size-16" />
                Retour à la page de connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-noovimo-50 to-white">
      <div className="w-full max-w-md animate-scale-in">
        <div className="glass-card rounded-2xl p-4 sm:p-8 shadow-medium">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mot de passe oublié</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </p>
          </div>
          
          {!isSupabaseConfigured && (
            <Alert className="mb-4 sm:mb-6 bg-amber-50 border-amber-200">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
              <AlertDescription className="text-xs sm:text-sm text-amber-800">
                Mode démo activé. La réinitialisation est simulée et ne fonctionnera pas réellement.
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="email" className="text-xs sm:text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@noovimo.fr"
                className="w-full rounded-lg border border-input px-3 sm:px-4 py-1.5 sm:py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-noovimo-500 hover:bg-noovimo-600 text-white rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 font-medium transition-colors disabled:bg-noovimo-300 text-sm"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-xs sm:text-sm">Envoi en cours...</span>
                </span>
              ) : (
                <span className="text-xs sm:text-sm">Envoyer les instructions</span>
              )}
            </button>
            
            <div className="mt-4">
              <Link to="/login" 
                className="flex items-center justify-center gap-1 sm:gap-2 w-full text-center text-xs sm:text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft size={14} className="sm:size-16" />
                Retour à la page de connexion
              </Link>
            </div>
          </form>
          
          <div className="mt-4 sm:mt-6 text-center text-xs text-muted-foreground">
            <p>© 2023 Noovimo. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
