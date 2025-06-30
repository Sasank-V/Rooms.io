// Standard response type for all services
export interface ServiceResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export function sendResponse<T = any>({
  success,
  message,
  data,
  error,
}: {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}): ServiceResponse<T> {
  return {
    success,
    message,
    data,
    error,
  };
}
