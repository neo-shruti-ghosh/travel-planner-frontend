import { api } from '@/core/api/axios'

interface LoginPayload {
  email: string
  password: string
}

export const loginUser = async (
  payload: LoginPayload
) => {
  const response = await api.post(
    '/auth/login',
    payload
  )

  return response.data
}

export const getCurrentUser = async () => {
    const response = await api.get('/auth/me');
    return response.data;
  };

  export const logoutUser = async() => {
    const response = await api.post('/auth/logout');
    return response.data;
  }