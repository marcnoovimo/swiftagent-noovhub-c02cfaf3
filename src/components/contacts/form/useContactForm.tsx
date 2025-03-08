
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormValues } from './types';
import { Contact } from '@/types/contact';
import { useToast } from '@/hooks/use-toast';

interface UseContactFormProps {
  onSave?: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

export const useContactForm = ({ onSave, onClose }: UseContactFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      emailPro: '',
      phone: '',
      mobile: '',
      company: '',
      position: '',
      address: '',
      city: '',
      notes: '',
      category: 'prospect',
      tags: [],
      source: 'manual',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // Convert form values to the expected Contact type (without id/createdAt/updatedAt)
    const contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || undefined,
      emailPro: data.emailPro || undefined,
      phone: data.phone,
      mobile: data.mobile,
      company: data.company,
      position: data.position,
      address: data.address,
      city: data.city,
      notes: data.notes,
      category: data.category,
      tags: data.tags,
      source: data.source,
      photo: data.photo,
    };
    
    onSave?.(contactData);
    
    toast({
      title: "Contact créé",
      description: `${data.firstName} ${data.lastName} a été ajouté au répertoire.`,
    });
    
    form.reset();
    onClose();
  };

  return {
    form,
    onSubmit
  };
};
