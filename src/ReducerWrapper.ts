import type {Action} from 'redux'
import type {ThunkAction} from 'redux-thunk'
import type {DispatcherWrapper} from './DispatcherWrapper'
import type {ClassType} from './types'

export abstract class ReducerWrapper<
  T extends string,
  S,
  A extends S & Action<T>
> {
  protected abstract readonly initialState: S
  protected abstract readonly dispatchers: ClassType<
    DispatcherWrapper<T, S, A>
  >[]

  abstract readonly actions: Record<
    string,
    (...params: any[]) => Partial<A> | ThunkAction<any, any, any, any>
  >

  readonly reducer = (state = this.initialState, action: A): S => {
    const instances = this.dispatchers.map(
      (Dispatcher) => new Dispatcher(this.initialState)
    )
    const dispatcher = instances.find((it) => it.type === action.type)

    if (dispatcher) {
      return dispatcher.reducer(state, action)
    }

    return state
  }

  protected commit(type: T, payload: Partial<Omit<A, 'type'>>) {
    return {type, ...payload} as Partial<A>
  }
}
