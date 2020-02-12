import axios, { AxiosInstance } from 'axios';
import { Weather } from './types';
import { Collection } from '../types';

const config = {
  url:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_API_PROD_ENDPOINT
      : process.env.REACT_API_DEV_ENDPOINT,
};

export default class Api {
  private _apiUrl: string =
  config.url || 'https://localhost:44349/';
  private _httpClient: AxiosInstance;

  constructor() {
    this._httpClient = axios.create();
  }

  // TODO: Add in functionality for dynamic url parameter population
  public async callGetEndpoint(api: string, params: string): Promise<any> {
    let url = `${this._apiUrl}${api}`;
    return this._httpClient.get(url);
  }

  public test(): void {
    let url = `${this._apiUrl}${'weatherforecast'}`;
    // this._httpClient.get(url).then((response) => console.log(response.data));
    this._httpClient.get(url).then((response) => {
      let map = response.data;
      console.log(map[0]);
    });
  }

  // TODO: Add callPostEndpoint()
}
