import { LOAD_VENDOR } from 'src/actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOAD_VENDOR:
          return {...state, data: action.payload};
        default:
          return state;
    }
}
