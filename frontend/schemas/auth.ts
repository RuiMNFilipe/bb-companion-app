import { authApi } from '@/lib/api';
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long'),
  rememberMe: z.boolean().optional(),
});

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain letters, numbers, underscore and dash',
      )
      .refine(
        async (username): Promise<boolean> => {
          if (!username) return false;
          try {
            const exists: boolean = await authApi.checkUsernameExists(username);
            return !exists;
          } catch {
            return true;
          }
        },
        {
          error:
            'This username is already taken. Please, take a different one.',
        },
      ),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
