import {showToast, Toast} from '@raycast/api'
import {runAppleScript} from 'run-applescript'

export default async function Command() {
    const toast = await showToast({
        style: Toast.Style.Animated,
        title: 'Deleting timer...',
    })

    try {
        await runAppleScript(`
            if not application "Horo" is running then
                error number -128
            end if

            tell application "System Events" to tell process "Horo"
                click menu bar item 1 of menu bar 2
                set ps to description of UI element 4 of front window
                click UI element 4 of front window
            end tell
        `)

        toast.style = Toast.Style.Success
        toast.title = 'Success'
        toast.message = 'deleted current timer'
    } catch (error: any) {
        toast.style = Toast.Style.Failure
        toast.title = 'Failed deleting horo timer'
        toast.message = String(error)

        const err = error.message.split('.')[1]
        if (err) {
            const errCode = err.replace(/[()]/g, '')
            console.log(errCode)
            toast.title = 'Horo timer is not running'
        }
    }
}
