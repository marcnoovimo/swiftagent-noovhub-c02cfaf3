
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ContactFormData } from './types';

interface ContactNotesProps {
  formData: ContactFormData;
  onChangeField: (id: string, value: any) => void;
}

const ContactNotes: React.FC<ContactNotesProps> = ({ formData, onChangeField }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea 
          id="notes" 
          value={formData.notes} 
          onChange={(e) => onChangeField('notes', e.target.value)}
          placeholder="Notes additionnelles sur le contact"
          className="min-h-[150px] bg-white dark:bg-gray-950"
        />
      </div>
    </div>
  );
};

export default ContactNotes;
