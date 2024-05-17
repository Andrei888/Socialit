/**
 * Create Store with dynamic reducers
 */

import { createStore, applyMiddleware, AnyAction, Store } from "redux";
import { History } from "history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware, { Saga, Task } from "redux-saga";
import { createInjectorsEnhancer } from "redux-injectors";
import { composeWithDevTools } from "redux-devtools-extension";
import createReducer, { InjectedReducers } from "./reducers";
import coreMiddlewares from "./core/coreMiddlewares";

interface EnhancedStore extends Store<any, AnyAction> {
  injectReducers: InjectedReducers;
  runSaga: <S extends Saga<any[]>>(saga: S, ...args: Parameters<S>) => Task;
  injectedSagas: {
    [key: string]: Saga<any[]>;
  };
}

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(
  initialState = {},
  history: History<any>
) {
  const middlewares = [
    ...coreMiddlewares,
    sagaMiddleware,
    routerMiddleware(history),
  ];
  const runSaga = sagaMiddleware.run;

  const enhancers = [
    applyMiddleware(...middlewares),
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = createStore(
    createReducer(),
    initialState,
    composeWithDevTools(...enhancers)
  ) as EnhancedStore;

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectReducers = {};
  store.injectedSagas = {};

  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createReducer(store.injectReducers));
    });
  }

  return store;
}
