
import React, { useState } from 'react';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react';
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
      // Check email domain
      if (!email.toLowerCase().endsWith('@noovimo.fr') && !email.toLowerCase().endsWith('@admin.noovimo.fr')) {
        toast.error('Veuillez utiliser une adresse email @noovimo.fr');
        setIsLoading(false);
        return;
      }
      
      const { error } = await resetPassword(email);
      
      if (error && !demoMode) {
        toast.error('Une erreur est survenue. Veuillez réessayer.');
        console.error("Password reset error:", error);
      } else {
        toast.success('Instructions envoyées! Vérifiez votre boîte de réception.');
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error('Une erreur est survenue lors de la réinitialisation.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-noovimo-50 to-white">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl p-4 sm:p-8 shadow-medium">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mot de passe oublié</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              {isSubmitted 
                ? "Vérifiez votre boîte de réception pour les instructions de réinitialisation" 
                : "Saisissez votre adresse email pour réinitialiser votre mot de passe"}
            </p>
          </div>
          
          {!isSupabaseConfigured && (
            <Alert className="mb-4 sm:mb-6 bg-amber-50 border-amber-200 text-xs sm:text-sm">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
              <AlertDescription className="text-xs sm:text-sm text-amber-800">
                Mode démo activé. La réinitialisation du mot de passe est simulée.
              </AlertDescription>
            </Alert>
          )}
          
          {isSubmitted ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 text-center">
                <p className="text-xs sm:text-sm text-green-800">
                  Si votre adresse email existe dans notre système, vous recevrez un email avec des instructions pour réinitialiser votre mot de passe.
                </p>
              </div>
              
              <Link 
                to="/login" 
                className="w-full flex items-center justify-center bg-noovimo-500 hover:bg-noovimo-600 text-white rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 font-medium transition-colors text-sm"
              >
                <ArrowLeft size={16} className="mr-2" />
                <span>Retour à la connexion</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
              
              <div className="flex items-center gap-2 sm:gap-3">
                <Link 
                  to="/login" 
                  className="flex-1 flex items-center justify-center border border-noovimo-200 bg-white hover:bg-gray-50 text-noovimo-600 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 font-medium transition-colors text-sm"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  <span>Retour</span>
                </Link>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center bg-noovimo-500 hover:bg-noovimo-600 text-white rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 font-medium transition-colors disabled:bg-noovimo-300 text-sm"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-xs sm:text-sm">Envoi...</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send size={16} className="mr-2" />
                      <span className="text-xs sm:text-sm">Envoyer</span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
          
          <div className="mt-4 sm:mt-6 text-center text-xs text-muted-foreground">
            <p>© 2023 Noovimo. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
