import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root/rootReducer';
import thunkMiddleware from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
