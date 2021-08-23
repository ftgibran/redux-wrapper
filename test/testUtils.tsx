import React from 'react'
import {createStore, Store} from 'redux'
import {Provider} from 'react-redux'
import {render} from '@testing-library/react'
import {RootState, RootStore} from '../stories/store/RootStore'

const store: Store<RootState> = createStore(RootStore.reducers)

const Providers = ({children}: any) => {
  return <Provider store={store}>{children}</Provider>
}

const customRender = (ui: any, options = {}) =>
  render(ui, {wrapper: Providers, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}
