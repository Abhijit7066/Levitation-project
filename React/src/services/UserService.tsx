// src/services/UserService.ts
import axios, { AxiosResponse } from 'axios';

const USER_BASE_REST_API_URL = 'http://localhost:8080';

class UserService {
  private token: string;

  constructor() {
    this.token = localStorage.getItem('token') || '';
  }

  setToken = (newToken: string): void => {
    localStorage.setItem('token', newToken);
    this.token = newToken;
  };

  clearToken = (): void => {
    localStorage.removeItem('token');
    this.token = '';
  };

  signup = (user: object): Promise<AxiosResponse> => {
    return axios.post(`${USER_BASE_REST_API_URL}/signup`, user);
  };

  signin = async (user: object): Promise<AxiosResponse> => {
    try {
      const response = await axios.post(`${USER_BASE_REST_API_URL}/signin`, user);
      const { token } = response.data;
      this.setToken(token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  paginated = (): Promise<AxiosResponse> => {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return axios.get(`${USER_BASE_REST_API_URL}/getProducts`, { headers });
  };
  download = (): Promise<AxiosResponse> => {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    console.log(1);
    
    return axios.get(`${USER_BASE_REST_API_URL}/generate`, { headers });
  };

  delete = (id: string): Promise<AxiosResponse> => {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return axios.delete(`${USER_BASE_REST_API_URL}/deleteProduct/${id}`, { headers });
  };

  insert = (product: object): Promise<AxiosResponse> => {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return axios.post(`${USER_BASE_REST_API_URL}/addProduct`, product, { headers });
  };

  update = (id: string, product: object): Promise<AxiosResponse> => {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return axios.put(`${USER_BASE_REST_API_URL}/updateProduct/${id}`, product, { headers });
  };

  // Axios interceptor for handling the token on every request
  setupInterceptors = (): void => {
    axios.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  };
}

const userService = new UserService();
userService.setupInterceptors(); // Call this to set up the interceptor

export default userService;
