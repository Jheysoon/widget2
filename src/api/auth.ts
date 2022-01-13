import axios from 'axios';
import qs from 'qs';

import { ENV, PROD } from '../common/constants/env';

const BASE_URL = ENV === PROD ? 'https://accounts.zoho.com' : '/api1';

const REFRESH_TOKEN =
  '1000.9369aa358da7bc06397a7e292bfd53aa.296933469e7428718b834da9eb3f94a8'; // user must supply this
const CLIENT_ID = '1000.KZO1BTRJAPWW3Y8S66LCFZ0RU8A8XU';
const CLIENT_SECRET = '82dcf92b132a98ef0026b658e187d4fd080f80ca71';
const SCOPE = 'ZohoCRM.modules.ALL';
const REDIRECT_URI = 'https://google.com';

const GRANT_TYPE = 'refresh_token';
const ZOHO_URL = BASE_URL + '/oauth/v2/token';

const PARAM = {
  refresh_token: REFRESH_TOKEN,
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  scope: SCOPE,
  redirect_uri: REDIRECT_URI,
  grant_type: GRANT_TYPE,
};

class AuthClient {
  async refreshToken() {
    console.log('############# refreshToken');

    const queryString = qs.stringify(PARAM);
    const url = ZOHO_URL + '?' + queryString;
    console.log(url);

    try {
      console.log('data 11 here ##########');
      const { data } = await axios.post(url, null, { withCredentials: true });
      console.log('data here ##########');
      console.log(data);

      return data;
    } catch (e) {
      console.log('error #############');
      console.log(e);
    }

    //localStorage.setItem('token', JSON.stringify(data));
  }

  async getToken() {
    console.log('############# getToken');
    let data: any = await this.refreshToken();

    console.log('############# after getToken');
    return JSON.parse(data);
  }
}

const authClient = new AuthClient();

export default authClient;
