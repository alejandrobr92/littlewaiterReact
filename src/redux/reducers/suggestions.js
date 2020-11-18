import items from '../../data/items'
import {type as findSuggestionType} from '../actions/findSuggestion'
const defaultState= []

function reducer(state =defaultState, {type, payload}){
    switch (type){

        case findSuggestionType:{
            // const regex= new RegExp([´´´´])
            return items;
        }
        default:
            return state;
    }
}

export default reducer;