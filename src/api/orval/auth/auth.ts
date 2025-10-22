/**
 * Auth API Orval adaptada para usar baseURL do Render
 */
import * as axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  AuthControllerGetResetPasswordPageParams,
  LoginDto,
  RegisterDto,
  RequestMagicLinkDto,
  ResetPasswordDto
} from '../coopApi.schemas';

// Cria instância do axios com a URL da sua API no Render
const axiosInstance = axios.default.create({
  baseURL: import.meta.env.VITE_API_URL // URL da API no Render
});

export const getAuth = () => {
  /** Registrar novo usuário */
  const authControllerRegister = <TData = AxiosResponse<void>>(
    registerDto: RegisterDto,
    options?: AxiosRequestConfig
  ): Promise<TData> => {
    return axiosInstance.post('/register', registerDto, options);
  };

  /** Fazer login */
  const authControllerLogin = <TData = AxiosResponse<void>>(
    loginDto: LoginDto,
    options?: AxiosRequestConfig
  ): Promise<TData> => {
    return axiosInstance.post('/login', loginDto, options);
  };

  /** Obter perfil do usuário autenticado */
  const authControllerGetProfile = <TData = AxiosResponse<void>>(
    options?: AxiosRequestConfig
  ): Promise<TData> => {
    return axiosInstance.get('/profile', options);
  };

  /** Solicitar Magic Link */
  const authControllerRequestMagicLink = <TData = AxiosResponse<void>>(
    requestMagicLinkDto: RequestMagicLinkDto,
    options?: AxiosRequestConfig
  ): Promise<TData> => {
    return axiosInstance.post('/request-magic-link', requestMagicLinkDto, options);
  };

  /** Página de redefinição de senha */
  const authControllerGetResetPasswordPage = <TData = AxiosResponse<void>>(
    params: AuthControllerGetResetPasswordPageParams,
    options?: AxiosRequestConfig
  ): Promise<TData> => {
    return axiosInstance.get('/reset-password', {
      ...options,
      params: { ...params, ...options?.params }
    });
  };

  /** Redefinir senha usando Magic Link */
  const authControllerResetPassword = <TData = AxiosResponse<void>>(
    resetPasswordDto: ResetPasswordDto,
    options?: AxiosRequestConfig
  ): Promise<TData> => {
    return axiosInstance.post('/reset-password', resetPasswordDto, options);
  };

  return {
    authControllerRegister,
    authControllerLogin,
    authControllerGetProfile,
    authControllerRequestMagicLink,
    authControllerGetResetPasswordPage,
    authControllerResetPassword
  };
};

export type AuthControllerRegisterResult = AxiosResponse<void>;
export type AuthControllerLoginResult = AxiosResponse<void>;
export type AuthControllerGetProfileResult = AxiosResponse<void>;
export type AuthControllerRequestMagicLinkResult = AxiosResponse<void>;
export type AuthControllerGetResetPasswordPageResult = AxiosResponse<void>;
export type AuthControllerResetPasswordResult = AxiosResponse<void>;
