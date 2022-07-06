import {Action, Icon, Toast, showToast} from '@raycast/api'
import {runAppleScript} from 'run-applescript'

export function CreateNewTimer() {
    async function handleSubmit(values: {timeStr: string}) {
        if (!values.timeStr) {
            showToast({
                style: Toast.Style.Failure,
                title: 'Time string is required',
            })
            return
        }

        const toast = await showToast({
            style: Toast.Style.Animated,
            title: 'Starting timer...',
        })

        try {
            await runAppleScript(`
                tell application "System Events" to tell process "Horo"
                    click menu bar item 1 of menu bar 2
                    key code 51
                end tell
            `)

            toast.style = Toast.Style.Success
            toast.title = 'Success'
            toast.message = 'deleted current timer'
        } catch (error) {
            console.log(error)
            toast.style = Toast.Style.Failure
            toast.title = 'Failed deleting horo timer'
            toast.message = String(error)
        }
    }

    return <Action.SubmitForm icon={Icon.Clock} title="de" onSubmit={handleSubmit} />
}
