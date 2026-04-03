export const formatPrice = (value: number | undefined | null): string => {
  if (value === undefined || value === null || isNaN(value)) {
    return '—';
  }
  return '$' + new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export interface PriceParts {
  integer: string;
  decimal: string;
  isNegative: boolean;
  isValid: boolean;
}

export const formatPriceParts = (value: number | undefined | null): PriceParts => {
  if (value === undefined || value === null || isNaN(value)) {
    return { integer: '—', decimal: '', isNegative: false, isValid: false };
  }
  
  const formatter = new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  // Using string split is most robust for our specific case with es-CL which uses comma
  const formattedStr = formatter.format(Math.abs(value));
  const parts = formattedStr.split(','); 
  
  return {
    integer: parts[0],
    decimal: parts.length > 1 ? ',' + parts[1] : '',
    isNegative: value < 0,
    isValid: true,
  };
};

export const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return '—';
  
  try {
    const date = new Date(dateString);
    // Invalid date check
    if (isNaN(date.getTime())) return '—';
    
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    return '—';
  }
};
