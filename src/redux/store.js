import {createStore, combineReducers} from 'redux'
import results from './reducers/results';
import suggestions from './reducers/suggestions';
import currentItem from './reducers/currentItem'

const reducer = combineReducers({
results,
suggestions,
currentItem

})
const globalState = localStorage.getItem('GLOBAL_STATE');
const initialState = globalState ? JSON.parse(globalState) : undefined;

const store =createStore(reducer,initialState);

export const saveState =()=>{
    const state =store.getState();    
    localStorage.setItem('GLOBAL_STATE',JSON.stringify(state));
}
export default store;