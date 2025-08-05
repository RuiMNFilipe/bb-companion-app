import { useMemo } from 'react';

import { PasswordStrength } from '@/types';

export const usePasswordStrength = (password: string): PasswordStrength => {
  return useMemo(() => {
    if (!password) {
      return {
        strength: 0,
        label: '',
        color: '#8e8e93',
      };
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    const strengthLabels: string[] = [
      'Very weak',
      'Weak',
      'Fair',
      'Good',
      'String',
    ];
    const strengthColors: string[] = [
      '#ff6b6b',
      '#ff8e53',
      '#feca57',
      '#48dbfb',
      '#0be881',
    ];

    return {
      strength,
      label: strengthLabels[Math.min(strength - 1, 4)] || 'Very Weak',
      color: strengthColors[Math.min(strength - 1, 4)] || '#ff6b6b',
    };
  }, [password]);
};
