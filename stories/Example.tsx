import React from 'react'
import type {Store} from 'redux'
import {createStore} from 'redux'
import {Provider, useDispatch, useSelector} from 'react-redux'
import type {RootState} from './store/RootStore'
import {RootStore} from './store/RootStore'

const store: Store<RootState> = createStore(RootStore.reducers)

export function ExampleConsumer() {
  const {app} = useSelector(RootStore.app.getters)
  const {language} = app
  const dispatch = useDispatch()

  const changeLanguage = (val: string) => {
    dispatch(RootStore.app.actions.setLanguage(val))
  }

  return (
    <div>
      <div style={{fontSize: 24, marginBottom: 16}}>
        Current language: {language}
      </div>

      <button onClick={() => changeLanguage('pt-BR')}>Change to pt-BR</button>

      <button onClick={() => changeLanguage('en-US')}>Change to en-US</button>
    </div>
  )
}

export function ExampleProvider() {
  return (
    <Provider store={store}>
      <ExampleConsumer />
    </Provider>
  )
}
