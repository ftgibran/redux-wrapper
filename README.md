# @dev-plus-plus/redux-wrapper

Make simple the way of using Redux

## [Example](https://github.com/ftgibran/redux-wrapper/tree/master/src/stories/Example.tsx)

## Installation

```sh
npm install @dev-plus-plus/redux-wrapper
```

## Usage

In order to simplify the use of Redux, you have to use wrappers provided in this library.

They have to extend your reducers as the following:

### ~src/store/app/AppReducer.ts
```tsx
import {ReducerWrapper} from '@dev-plus-plus/redux-wrapper'
import {LanguageDispatcher} from './dispatchers/LanguageDispatcher'

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
```

### ~src/store/app/dispatchers/LanguageDispatcher.ts
```tsx
import {DispatcherWrapper} from '@dev-plus-plus/redux-wrapper'

export class LanguageDispatcher extends DispatcherWrapper< AppType, AppState, AppAction > {
  readonly type = 'SET_LANGUAGE'

  readonly reducer: AppReducer = (state, action) => {
    const {language} = action

    return this.set(state, {language})
  }
}
```

### ~src/types/reducers/app.d.ts
```tsx
import {Action} from 'redux'
import type {ReducerApplied} from '@dev-plus-plus/redux-wrapper'

export declare global {
  type AppType = 'SET_LANGUAGE'

  interface AppState {
    language: string
  }

  type AppAction = AppState & Action<AppType>

  type AppReducer = ReducerApplied<AppState, AppAction>
}
```

### ~src/store/RootStore.ts
```tsx
import {combineReducers} from 'redux'
import {AppReducer} from './app/AppReducer'

export type RootState = ReturnType<typeof RootStore.reducers>

export abstract class RootStore {
  static readonly app = new AppReducer()

  static readonly reducers = combineReducers({
    app: RootStore.app.reducer,
  })
}
```

### ~src/App.tsx
```tsx
import * as React from 'react'
import type {Store} from 'redux'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import type {RootState} from './store/RootStore'
import {RootStore} from './store/RootStore'
import Home from './Home'

const store: Store<RootState> = createStore(RootStore.reducers)

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}
```

### ~src/Home.tsx
```tsx
import * as React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import type {RootState} from './store/RootStore'
import {RootStore} from './store/RootStore'

export default function Home() {
  const {app} = useSelector(RootStore.app.getters)
  const {language} = app

  const dispatch = useDispatch()

  const changeLanguage = (val: string) => {
    dispatch(RootStore.app.actions.setLanguage(val))
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, marginBottom: 16}}>
        Current language: {language}
      </Text>

      <Button
        title={'Change to pt-BR'}
        onPress={() => changeLanguage('pt-BR')}
      />

      <Button
        title={'Change to en-US'}
        onPress={() => changeLanguage('en-US')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
```

## License

MIT