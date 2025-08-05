import { useMemo } from 'react';

import { PasswordRequirements } from '@/types';

export const usePasswordRequirements = (
  password: string,
): PasswordRequirements => {
  return useMemo(
    () => ({
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasMinLength: password.length >= 8,
    }),
    [password],
  );
};
