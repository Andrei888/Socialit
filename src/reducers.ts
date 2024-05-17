/**
 * Combine All Reducers in this file and export combination
 */

import { AnyAction, CombinedState, combineReducers, Reducer } from "redux";
import { connectRouter } from "connected-react-router";
import history from "./utils/history";

export interface InjectedReducers {
  [key: string]: Reducer<any, AnyAction>;
}

export interface CreateReducerFunc {
  (injectedReducers: InjectedReducers): Reducer<CombinedState<any>>;
}

/**
 * Merged the main Reducer with the router state and dynamically inject reducers
 */

export default function createReducer(
  injectedReducers: InjectedReducers = {}
): Reducer<CombinedState<any>> {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer as Reducer<any, AnyAction>;
}
