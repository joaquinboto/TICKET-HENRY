import {createStore} from "redux";
import { applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../store/reducer";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))