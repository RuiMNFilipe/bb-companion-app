export interface ApiError extends Error {
  status: number;
  data?: any;
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    error instanceof Error &&
    'status' in error &&
    typeof (error as any).status === 'number'
  );
};
