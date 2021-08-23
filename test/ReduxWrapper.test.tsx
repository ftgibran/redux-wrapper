import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {render, cleanup} from './testUtils'
import {RootStore} from '../src/stories/store/RootStore'

describe('ReduxWrapper', () => {
  afterEach(() => cleanup())

  it('can access language', async () => {
    const Consumer = () => {
      const {app} = useSelector(RootStore.app.getters)

      useEffect(() => {
        expect(app.language).toEqual('en-US')
      }, [])

      return <React.Fragment />
    }

    render(<Consumer />)
  })

  it('can change language', async () => {
    const Consumer = () => {
      const {app} = useSelector(RootStore.app.getters)
      const dispatch = useDispatch()
      const [mounted, setMounted] = useState(false)

      useEffect(() => {
        dispatch(RootStore.app.actions.setLanguage('pt-BR'))
        setMounted(true)
      }, [])

      useEffect(() => {
        if (mounted) {
          expect(app.language).toEqual('pt-BR')
        }
      }, [mounted])

      return <React.Fragment />
    }

    render(<Consumer />)
  })
})
