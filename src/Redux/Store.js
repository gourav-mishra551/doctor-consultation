import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from 'redux-thunk';
import reducer from "./Reducer";
let reducerRoot=combineReducers({reducer});
let middleWare=[thunk]
 const store=legacy_createStore(reducerRoot,applyMiddleware(...middleWare));
export {store};