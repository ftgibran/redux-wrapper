import {Action} from 'redux'
import type {ReducerApplied} from '../../types'

export type AppType = 'SET_LANGUAGE'

export interface AppState {
  language: string
}

export type AppAction = AppState & Action<AppType>

export type AppReducer = ReducerApplied<AppState, AppAction>
