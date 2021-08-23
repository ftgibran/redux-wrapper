import {LanguageDispatcher} from './dispatchers/LanguageDispatcher'
import {ReducerWrapper} from '../../../ReducerWrapper'
import {AppAction, AppState, AppType} from '../types'
import {RootState} from '../RootStore'

export class AppReducer extends ReducerWrapper<AppType, AppState, AppAction> {
  protected readonly initialState: AppState = {
    language: 'en-US',
  }

  protected readonly dispatchers = [LanguageDispatcher]

  readonly getters = (state: RootState) => ({
    app: state.app,
  })

  readonly actions = {
    setLanguage: (language: string) => {
      return this.commit('SET_LANGUAGE', {language})
    },
  }
}
