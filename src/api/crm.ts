import axios from 'axios';

import AuthClient from './auth';
import { ENV, PROD } from '../common/constants/env';

const BASE_URL = ENV === PROD ? 'https://www.zohoapis.com' : '/api2';

const CRM_URL = BASE_URL + '/crm/v2/';

class ZohoCRM {
  constructor() {
    axios.interceptors.response.use(undefined, async error => {
      if (error.config && error.response && error.response.status === 401) {
        await AuthClient.refreshToken();

        const { method, url, data, headers } = error.config;

        if (method === 'post') {
          return axios.post(url, data, { headers });
        } else if (method === 'put') {
          return axios.put(url, data, { headers });
        }

        return axios.get(url, { headers });
      }

      return Promise.reject(error);
    });

    axios.interceptors.request.use(
      async config => {
        let data: any = await AuthClient.getToken();

        config.headers = {
          Authorization: 'Zoho-oauthtoken ' + data.access_token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };

        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  // https://www.zoho.com/crm/developer/docs/api/v2/get-records.html
  getRecords(module: string) {
    return axios.get(CRM_URL + module);
  }
}

const zohoCRM = new ZohoCRM();

export default zohoCRM;
