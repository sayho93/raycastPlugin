import {showToast, Toast} from '@raycast/api'
import {runAppleScript} from 'run-applescript'

export default async function Command() {
    const toast = await showToast({
        style: Toast.Style.Animated,
        title: 'Adjusting Desk...',
    })

    try {
        const res = await runAppleScript(`
          on isRunning(appName)
              tell application "System Events" to (name of processes) contains appName
          end isRunning

          property flag = isRunning("Desk Remote Control")

          Log flag

          #activate application "Desk Remote Control"
          #tell application "Desk Remote Control"
          #    tell application "System Events" to tell process "Desk Remote Control"
          #        if flag then
          #            click menu bar item 1 of menu bar 2
          #        end if
          #    end tell
          #end tell
        `)
        console.log(res)

        toast.style = Toast.Style.Success
        toast.title = 'Success'
        toast.message = 'deleted current timer'
    } catch (error) {
        toast.style = Toast.Style.Failure
        toast.title = 'Failed deleting horo timer'
        toast.message = String(error)

        if(!(error instanceof Error)){
            console.log(error)
            return
        }

        const err = error.message.split('.')[1]
        if (err) {
          console.log(err)
            const errCode = err.replace(/[()]/g, '')
            console.log(errCode)
            toast.title = 'Horo timer is not running'
        } 
    }
}
