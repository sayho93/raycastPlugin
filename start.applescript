-- property flag = false

on isRunning(appName)
    tell application "System Events" to (name of processes) contains appName
end isRunning

property flag = isRunning("Horo")

log flag

activate application "Horo"

tell application "Horo"
    tell application "System Events" to tell process "Horo"
        if flag then
            click menu bar item 1 of menu bar 2
        end if

        set value of text field 1 of window 1 to "1h"
        key code 36
    end tell
end tell