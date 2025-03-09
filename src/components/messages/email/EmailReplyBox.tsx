import React, { useState } from 'react';
import { Paperclip, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import '@/styles/buttons.css'; // Direct import of button styles
import '@/styles/forms.css'; // Direct import of form styles for textarea

interface EmailReplyBoxProps {
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleSendReply: () => void;
}

const EmailReplyBox = ({ replyContent, setReplyContent, handleSendReply }: EmailReplyBoxProps) => {
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();
  
  const handleSend = async () => {
    if (!replyContent.trim()) {
      toast.error("Votre message est vide");
      return;
    }
    
    setIsSending(true);
    try {
      await handleSendReply();
      // Simuler la synchronisation sur tous les appareils
      toast.success("Message envoyé et synchronisé sur tous vos appareils", {
        id: "email-sync",
        duration: 3000
      });
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="p-2 sm:p-4 border border-border/50 rounded-lg">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h4 className="text-xs sm:text-sm font-medium">Répondre</h4>
        {user && (
          <span className="text-xs text-muted-foreground">
            De: {user.email || 'utilisateur@noovimo.fr'}
          </span>
        )}
      </div>
      
      <textarea
        className="w-full p-2 sm:p-3 border border-border/50 rounded-lg bg-secondary/20 focus:outline-none focus:ring-1 focus:ring-[#d72345] resize-none text-xs sm:text-sm"
        rows={5}
        placeholder="Votre réponse..."
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        disabled={isSending}
      ></textarea>
      
      <div className="flex justify-between items-center mt-2 sm:mt-3">
        <button className="icon-button" disabled={isSending}>
          <Paperclip size={16} className="text-muted-foreground" />
        </button>
        
        <button
          className="px-2 py-1 sm:px-4 sm:py-2 bg-[#d72345] text-white rounded-lg hover:bg-[#c01f3c] transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm disabled:opacity-70"
          onClick={handleSend}
          disabled={isSending}
        >
          {isSending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          <span>{isSending ? "Envoi..." : "Envoyer"}</span>
        </button>
      </div>
      
      <div className="mt-3 text-xs text-muted-foreground text-center">
        <p>Synchronisé sur tous vos appareils</p>
      </div>
    </div>
  );
};

export default EmailReplyBox;
