import { AxiosStatic } from 'axios';

export interface Store {
  sidebar: boolean;
  axios: AxiosStatic;
}
