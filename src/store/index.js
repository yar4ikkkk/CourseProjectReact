import {applyMiddleware, combineReducers, createStore} from "redux";
import {products} from "../redux/products/reducer";
import {filters} from "../redux/filters/reducers";
import {sliders} from "../redux/sliders/reducers";
import {pages} from "../redux/pages/reducers";
import thunk from "redux-thunk";

const middleware = applyMiddleware(thunk)

const rootReducer =  combineReducers({
    products,
    filters,
    sliders,
    pages
})

export const store = createStore(
    rootReducer,
    undefined,
    middleware,
)

