import rootReducer from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './devtools';
import {checkSessionStatus} from "./actions/AuthActions";
import {fetchRanking} from "./actions";
import {fetchProblems, startFetchingProblems} from "./problems/actions"

const configureStore = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
)(createStore);

const store = configureStore(rootReducer);
store.dispatch(startFetchingProblems());
store.dispatch(fetchProblems());
store.dispatch(checkSessionStatus());
store.dispatch(fetchRanking());

export default store;
