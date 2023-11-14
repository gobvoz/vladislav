import axios from 'axios';

import { LOCAL_STORAGE_TOKEN } from 'shared/constants/local-storage-key';

const api = axios.create({
  baseURL: __API_BASE_URL__,
});

api.interceptors.request.use((config: any) => {
  config.headers.authorization = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  return config;
});

export { api };
