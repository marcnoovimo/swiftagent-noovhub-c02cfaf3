
import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { ContactFormData } from './types';

export interface ContactAdditionalInfoProps {
  formData: ContactFormData;
  onChangeField: (id: string, value: any) => void;
  newTag: string;
  setNewTag: (tag: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  isMobile: boolean;
}

const ContactAdditionalInfo: React.FC<ContactAdditionalInfoProps> = ({
  formData,
  onChangeField,
  newTag,
  setNewTag,
  onAddTag,
  onRemoveTag,
  isMobile
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className={`font-medium ${isMobile ? 'text-sm mb-2' : 'text-base mb-3'}`}>Tags</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags && formData.tags.map((tag: string) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              {tag}
              <button 
                onClick={() => onRemoveTag(tag)}
                className="ml-1 p-0.5 hover:bg-gray-200 rounded-full"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Ajouter un tag"
            className={`${isMobile ? 'text-sm' : 'text-base'}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onAddTag();
              }
            }}
          />
          <Button 
            onClick={onAddTag} 
            type="button" 
            variant="outline" 
            size="sm"
            className="px-2"
          >
            <Plus size={18} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className={`font-medium ${isMobile ? 'text-sm mb-2' : 'text-base mb-3'}`}>Notes</h3>
          <textarea
            id="notes"
            value={formData.notes || ''}
            onChange={(e) => onChangeField('notes', e.target.value)}
            rows={6}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-noovimo-500"
            placeholder="Ajouter des notes concernant ce contact"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactAdditionalInfo;
