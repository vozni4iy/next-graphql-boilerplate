import { LOAD_CUSTOMER } from 'src/actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOAD_CUSTOMER:
          return {...state, data: action.payload};
        default:
          return state;
    }
}
