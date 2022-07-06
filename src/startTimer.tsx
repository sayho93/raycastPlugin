import {Form, ActionPanel, LocalStorage, List} from '@raycast/api'
import {CreateNewTimer} from './components/horoTimer/createNewTimer'
import {useEffect, useState} from 'react'
import {Timer} from './types'
import {nanoid} from 'nanoid'

type State = {
    isLoading: boolean
    timers: Timer[]
}

export default function Command() {
    const [state, setState] = useState<State>({
        isLoading: true,
        timers: [],
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

    useEffect(() => {
        LocalStorage.setItem('timers', JSON.stringify(state.timers))
    }, [state.timers])

    const addHistory = (timeStr: string) => {
        const newTimers = state.timers.filter(i => i.timeStr === timeStr).length ? state.timers : [{id: nanoid(), timeStr}, ...state.timers]
        setState(prev => ({...prev, timers: newTimers.length > 10 ? newTimers.slice(0, 10) : newTimers}))
    }

    return (
        <Form
            actions={
                <ActionPanel>
                    <ActionPanel.Section>
                        <CreateNewTimer addHistory={addHistory} />
                    </ActionPanel.Section>
                    <ActionPanel.Section>
                        {state.timers.map(timer => (
                            <CreateNewTimer key={timer.id} timeStr={timer.timeStr} addHistory={addHistory} />
                        ))}
                    </ActionPanel.Section>
                </ActionPanel>
            }
        >
            <Form.TextArea id="timeStr" title="Time" placeholder="45m" />
        </Form>
    )
}
