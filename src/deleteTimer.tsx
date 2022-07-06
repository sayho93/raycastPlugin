import {showToast, Toast} from '@raycast/api'
import {runAppleScript} from 'run-applescript'

export default async function Command() {
    const toast = await showToast({
        style: Toast.Style.Animated,
        title: 'Deleting timer...',
    })

    try {
        await runAppleScript(`
            tell application "Horo"
                if not application "Horo" is running then
                    activate
                end if

                tell application "System Events" to tell process "Horo"
                    click menu bar item 1 of menu bar 2
                    key code 51
                    key code 53
                end tell
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
