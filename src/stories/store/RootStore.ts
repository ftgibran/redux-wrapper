import {combineReducers} from 'redux'
import {AppReducer} from './app/AppReducer'

export type RootState = ReturnType<typeof RootStore.reducers>

export abstract class RootStore {
  static readonly app = new AppReducer()

  static readonly reducers = combineReducers({
    app: RootStore.app.reducer,
  })
}
