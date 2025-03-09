
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fonction pour formater une date au format français
export function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Formats a currency value according to French locale
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
};

// Convert data URL to File object (for handling scanned images)
export function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
}

// Helper to detect document type from name or content
export function detectDocumentType(name: string): string {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('compromis')) return 'Compromis de vente';
  if (lowerName.includes('promesse')) return 'Promesse de vente';
  if (lowerName.includes('bail') || lowerName.includes('location')) return 'Location';
  if (lowerName.includes('mandat')) return 'Mandat';
  if (lowerName.includes('attestation')) return 'Attestation de propriété';
  if (lowerName.includes('diagnostic') || lowerName.includes('dpe')) return 'Diagnostics';
  if (lowerName.includes('avenant')) return 'Avenants';
  if (lowerName.includes('taxe') || lowerName.includes('foncière') || lowerName.includes('fonciere')) return 'Taxe foncière';
  
  // Default category
  return 'Autres';
}

// Format file size for display
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
