import {type as findResults} from '../actions/findResults'
import items from '../../data/items'
const defaultState= [];

function reducer(state =defaultState, {type, payload}){
    switch (type){
        case findResults:{
            // const regex= new RegExp([´´´´])
            return items;
        }
        default:
            return state;
    }
}

export default reducer;