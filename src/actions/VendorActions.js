import { LOAD_VENDOR } from './types';

export const loadVendor = vendor => {
  return {
    type: LOAD_VENDOR,
    payload: vendor
  }
}
