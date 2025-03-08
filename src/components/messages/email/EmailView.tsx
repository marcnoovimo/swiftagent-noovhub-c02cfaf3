
import React from 'react';
import { FileText, Clock, Flag, Bookmark, Trash2, MoreVertical, MessageCircle } from 'lucide-react';
import EmailReplyBox from './EmailReplyBox';
import { Email } from '../types/email';

interface EmailViewProps {
  selectedEmail: Email | null;
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleSendReply: () => void;
}

const EmailView = ({ selectedEmail, replyContent, setReplyContent, handleSendReply }: EmailViewProps) => {
  if (!selectedEmail) {
    return (
      <div className="lg:col-span-7 flex flex-col h-[600px]">
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-secondary/50 mb-4">
            <MessageCircle size={20} className="text-muted-foreground" />
          </div>
          <h3 className="text-base sm:text-lg font-medium">Aucun email sélectionné</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Sélectionnez un email pour afficher son contenu
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 flex flex-col h-[600px]">
      <div className="p-2 sm:p-4 border-b border-border/50 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-medium truncate">{selectedEmail.subject}</h3>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button className="icon-button">
            <Clock size={16} className="text-muted-foreground" />
          </button>
          <button className="icon-button">
            <Flag size={16} className="text-muted-foreground" />
          </button>
          <button className="icon-button">
            <Bookmark size={16} className="text-muted-foreground" />
          </button>
          <button className="icon-button">
            <Trash2 size={16} className="text-muted-foreground" />
          </button>
          <button className="icon-button">
            <MoreVertical size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 sm:p-4">
        <div className="flex items-start mb-4">
          <img
            src={selectedEmail.from.avatar}
            alt={selectedEmail.from.name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover mr-2 sm:mr-3"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-medium truncate">{selectedEmail.from.name}</h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                  {selectedEmail.from.email}
                </p>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground ml-2">
                {selectedEmail.timestamp}
              </p>
            </div>
            
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">
              À: {selectedEmail.to.join(', ')}
            </div>
            
            <div className="mt-4 whitespace-pre-line text-xs sm:text-sm break-words">
              {selectedEmail.content}
            </div>
            
            {selectedEmail.hasAttachments && (
              <div className="mt-6 p-2 sm:p-3 border border-border/50 rounded-lg">
                <div className="flex items-center">
                  <FileText size={16} className="text-muted-foreground mr-2" />
                  <span className="text-xs sm:text-sm truncate">document_joint.pdf</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <EmailReplyBox 
            replyContent={replyContent} 
            setReplyContent={setReplyContent} 
            handleSendReply={handleSendReply} 
          />
        </div>
      </div>
    </div>
  );
};

export default EmailView;
