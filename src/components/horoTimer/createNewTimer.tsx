import {Action, Icon, Toast, showToast, closeMainWindow} from '@raycast/api'
import {runAppleScript} from 'run-applescript'

export function CreateNewTimer(props: {timeStr?: string; addHistory: (timeStr: string) => void}) {
    const startTimer = async (timeStr: string | undefined) => {
        if (!timeStr) {
            showToast({
                style: Toast.Style.Failure,
                title: 'Time string is required',
            })
            return
        }

        timeStr = timeStr.trim()

        const toast = await showToast({
            style: Toast.Style.Animated,
            title: 'Starting timer...',
        })

        try {
            await runAppleScript(`
                tell application "Horo"
                    if not application "Horo" is running then
                        launch
                        activate
                    end if

                    tell application "System Events" to tell process "Horo"
                        click menu bar item 1 of menu bar 2
                        set value of text field 1 of window 1 to "${timeStr}"
                        key code 36
                        set flat to true
                    end tell
                end tell
            `)

            toast.style = Toast.Style.Success
            toast.title = 'Success'
            toast.message = 'Timer is running'

            props.addHistory(timeStr)

            await closeMainWindow()
        } catch (error) {
            console.log(error)
            toast.style = Toast.Style.Failure
            toast.title = 'Failed running horo timer'
            toast.message = String(error)
        }
    }

    const handleSubmit = async (values: {timeStr: string}) => {
        await startTimer(values.timeStr)
    }

    return !props.timeStr ? (
        <Action.SubmitForm icon={Icon.Clock} title="Start Timer" onSubmit={handleSubmit} />
    ) : (
        <Action.SubmitForm icon={Icon.Clock} title={props.timeStr} onSubmit={async () => await startTimer(props.timeStr)} />
    )
}
