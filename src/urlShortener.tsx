import {Form, ActionPanel, LocalStorage, List} from '@raycast/api'
// import {CreateNewTimer} from './components/horoTimer/createNewTimer'
import {CreateShortUrlAction} from './components/urlShortener/createShortUrlAction'
import {useEffect, useState} from 'react'
import {Timer} from './types'
import {nanoid} from 'nanoid'

type State = {
    isLoading: boolean
    url: string
}

export default function Command() {
    const [state, setState] = useState<State>({
        isLoading: true,
        url: '',
    })

    useEffect(() => {
        ;(async () => {
            const localStorageTimers = await LocalStorage.getItem<string>('timers')

            if (!localStorageTimers) {
                setState(prev => ({...prev, isLoading: false}))
                return
            }

            try {
                const timers: Timer[] = JSON.parse(localStorageTimers)
                setState(prev => ({...prev, timers, isLoading: false}))
            } catch (e) {
                setState(prev => ({...prev, timers: [], isLoading: false}))
            }
        })()
    }, [])

    return (
        <Form
            actions={
                <ActionPanel>
                    <CreateShortUrlAction />
                </ActionPanel>
            }
        >
            <Form.TextArea id="url" title="URL" placeholder="enter url" />
        </Form>
    )
}
