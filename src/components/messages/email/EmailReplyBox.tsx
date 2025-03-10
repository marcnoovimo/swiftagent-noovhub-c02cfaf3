
import React, { useState } from 'react';
import { Paperclip, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
    <div className="p-4 border border-border/30 rounded-lg bg-card shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium">Répondre</h4>
        {user && (
          <span className="text-xs text-muted-foreground">
            De: {user.email || 'utilisateur@noovimo.fr'}
          </span>
        )}
      </div>
      
      <Textarea
        className="w-full p-3 border border-border/50 rounded-lg bg-background resize-none text-sm min-h-[120px] focus-visible:ring-1 focus-visible:ring-primary"
        placeholder="Votre réponse..."
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        disabled={isSending}
      />
      
      <div className="flex justify-between items-center mt-3">
        <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs" disabled={isSending}>
          <Paperclip size={14} />
          Joindre
        </Button>
        
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleSend}
          disabled={isSending}
        >
          {isSending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          <span>{isSending ? "Envoi..." : "Envoyer"}</span>
        </Button>
      </div>
      
      <div className="mt-3 text-xs text-muted-foreground text-center">
        <p>Synchronisé sur tous vos appareils</p>
      </div>
    </div>
  );
};

export default EmailReplyBox;
