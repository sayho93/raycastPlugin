
activate application "Horo"
tell application "System Events" to tell process "Horo"
    click menu bar item 1 of menu bar 2
    
    -- get description of every UI element of front window
    set value of text field 1 of window 1 to "45 m"


    key code 36

    -- repeat with uiElement in UI elements of front window
    --     if description of uiElement is "play" then
    --         click uiElement
    --         exit repeat
    --     end if
    -- end repeat
end tell