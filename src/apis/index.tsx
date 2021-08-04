import { ENV } from 'configs';
import { HttpClient } from 'services';

export const apiCaller = new HttpClient(ENV.API_ENDPOINT || '');
