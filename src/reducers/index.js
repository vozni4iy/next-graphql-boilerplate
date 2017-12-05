import {reducer as FormReducer} from 'redux-form'
import CustomerReducer from './CustomerReducer'
import VendorReducer from './VendorReducer'

const reducers = {
  form: FormReducer,
  customer: CustomerReducer,
  vendor: VendorReducer
}

export default reducers
