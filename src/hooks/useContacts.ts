
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Contact } from '@/types/contact';
import { fetchContacts } from '@/services/contactService';

export const useContacts = () => {
  const { data: contacts, isLoading, error, refetch } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  });

  return {
    contacts,
    isLoading,
    error,
    refetch
  };
};
