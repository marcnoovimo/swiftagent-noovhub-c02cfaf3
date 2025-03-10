
import { useState } from 'react';
import { format } from 'date-fns';
import { ContactFormData } from './types';
import { Contact } from '@/types/contact';

export const useContactForm = (contact?: Contact) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    email: contact?.email || '',
    emailPro: contact?.emailPro || '',
    phone: contact?.phone || '',
    mobile: contact?.mobile || '',
    company: contact?.company || '',
    position: contact?.position || '',
    address: contact?.address || '',
    city: contact?.city || '',
    notes: contact?.notes || '',
    category: contact?.category || 'client',
    tags: contact?.tags || [],
    dateOfBirth: contact?.dateOfBirth ? new Date(contact.dateOfBirth) : undefined,
    gender: contact?.gender || 'other',
  });

  const [newTag, setNewTag] = useState('');

  const handleChange = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value as any }));
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value as any }));
  };

  const handleDateOfBirthChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, dateOfBirth: date }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const prepareDataForSubmission = () => {
    // Format de la date pour l'API
    return {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? format(formData.dateOfBirth, 'yyyy-MM-dd') : undefined,
    };
  };

  return {
    formData,
    newTag,
    setNewTag,
    handleChange,
    handleCategoryChange,
    handleGenderChange,
    handleDateOfBirthChange,
    handleAddTag,
    handleRemoveTag,
    prepareDataForSubmission
  };
};
