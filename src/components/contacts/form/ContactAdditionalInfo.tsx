
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Tags } from 'lucide-react';
import { ContactFormData } from './types';

interface ContactAdditionalInfoProps {
  formData: ContactFormData;
  onChangeField: (id: string, value: any) => void;
  newTag: string;
  setNewTag: (tag: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

const ContactAdditionalInfo: React.FC<ContactAdditionalInfoProps> = ({
  formData,
  onChangeField,
  newTag,
  setNewTag,
  onAddTag,
  onRemoveTag
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tags" className="flex items-center gap-2">
          <Tags size={16} /> Tags
        </Label>
        <div className="flex gap-2">
          <Input 
            id="newTag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Ajouter un tag"
            className="bg-white dark:bg-gray-950"
          />
          <Button type="button" onClick={onAddTag} className="flex-shrink-0">
            Ajouter
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag, index) => (
            <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {tag}
              <button 
                type="button" 
                onClick={() => onRemoveTag(tag)}
                className="text-secondary-foreground/70 hover:text-secondary-foreground"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes" className="flex items-center gap-2">
          Notes
        </Label>
        <Textarea 
          id="notes"
          value={formData.notes}
          onChange={(e) => onChangeField('notes', e.target.value)}
          placeholder="Notes et informations supplémentaires sur le contact"
          className="min-h-[120px] bg-white dark:bg-gray-950"
        />
      </div>
    </div>
  );
};

export default ContactAdditionalInfo;
