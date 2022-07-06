import {Action, Icon, Toast, showToast, closeMainWindow} from '@raycast/api'
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
                tell application "Horo"
                    if not application "Horo" is running then
                        activate
                    end if

                    tell application "System Events" to tell process "Horo"
                        click menu bar item 1 of menu bar 2
                        keystroke "${values.timeStr}"
                        key code 36
                    end tell
                end tell
            `)

            toast.style = Toast.Style.Success
            toast.title = 'Success'
            toast.message = 'Timer is running'
            await closeMainWindow()
        } catch (error) {
            console.log(error)
            toast.style = Toast.Style.Failure
            toast.title = 'Failed running horo timer'
            toast.message = String(error)
        }
    }

    return <Action.SubmitForm icon={Icon.Clock} title="Start Timer" onSubmit={handleSubmit} />
}
