on isRunning(appName)
    tell application "System Events" to (name of processes) contains appName
end isRunning

property flag = isRunning("Desk Remote Control")

Log flag

-- activate application "Desk Remote Control"
-- tell application "Desk Remote Control"
--     tell application "System Events" to tell process "Desk Remote Control"
--         if flag then
--             Log button 7 of popover of menu bar item 1 of menu bar 1
--             click menu bar item 1 of menu bar 2 
--             -- click button 7 of window 1
--             delay 3
--             tell first pop over
--                 -- to get a list of all the contents of the the popover 
--                 entire contents
-- 
--                 -- to get the immediate (first level) contents of the popover
--                 UI elements
--             end tell
--             
--             -- click button 7 of popover of menu bar item 1 of menu bar 1
--         end if
--     end tell
-- end tell

activate application "Desk Remote Control"
tell application "System Events"
  tell process "Desk Remote Control"
    tell second menu bar
      entire contents
      tell first menu bar item 
        click

        delay 0.5
        entire contents
        UI elements
        -- tell popover
        -- end tell
        -- do shell script "echo " & popover
        

        --   do shell script "echo " & entire contents
        --   do shell script "echo " & UI elements
        --   do shell script "echo " & entire popover
        -- end tell
--         tell first window
--             -- to get a list of all the contents of the the popover 
--             entire contents
-- 
--             -- to get the immediate (first level) contents of the popover
--             UI elements
--         end tell
      end tell
    end tell
  end tell
end tell  