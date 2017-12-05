import { LOAD_CUSTOMER } from './types';

export const loadCustomer = customer => {
  return {
    type: LOAD_CUSTOMER,
    payload: customer
  }
}
