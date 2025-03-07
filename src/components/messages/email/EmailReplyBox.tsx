
import React from 'react';
import { Paperclip, Send } from 'lucide-react';

interface EmailReplyBoxProps {
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleSendReply: () => void;
}

const EmailReplyBox = ({ replyContent, setReplyContent, handleSendReply }: EmailReplyBoxProps) => {
  return (
    <div className="p-4 border border-border/50 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium">Répondre</h4>
      </div>
      
      <textarea
        className="w-full p-3 border border-border/50 rounded-lg bg-secondary/20 focus:outline-none focus:ring-1 focus:ring-[#d72345] resize-none"
        rows={5}
        placeholder="Votre réponse..."
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
      ></textarea>
      
      <div className="flex justify-between items-center mt-3">
        <button className="icon-button">
          <Paperclip size={18} className="text-muted-foreground" />
        </button>
        
        <button
          className="px-4 py-2 bg-[#d72345] text-white rounded-lg hover:bg-[#c01f3c] transition-colors flex items-center gap-2"
          onClick={handleSendReply}
        >
          <Send size={16} />
          <span>Envoyer</span>
        </button>
      </div>
    </div>
  );
};

export default EmailReplyBox;
