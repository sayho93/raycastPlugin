tell application "System Events" to tell process "Horo"
    click menu bar item 1 of menu bar 2

    get description of every UI element of front window
    -- set value of text field 1 of window 1 to "45 m"

    -- repeat with uiElement in UI elements of front window
    --     if description of uiElement is "play" then
    --         click uiElement
    --     end if
    -- end repeat
    set ps to description of UI element 4 of front window
    click UI element 4 of front window
    -- get description of button of UI elements of front window
    -- click button 2 of UI elements
end tell