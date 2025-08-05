import { z } from 'zod';

import { loginSchema, signUpSchema } from '@/schemas/auth';

export interface PasswordStrength {
  strength: number;
  label: string;
  color: string;
}

export interface PasswordRequirements {
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasMinLength: boolean;
}

export interface AuthScreenProps {
  onLogin?: (data: LoginFormData) => Promise<void>;
  onSignUp?: (data: Omit<SignUpFormData, 'confirmPassword'>) => Promise<void>;
  isLoading?: boolean;
}

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type FormData = SignUpFormData & LoginFormData;
