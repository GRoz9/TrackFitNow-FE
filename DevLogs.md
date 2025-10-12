### 05/06/25

- Added Daily logs, which it creates the daily log when its a new day
- Also added the ability to fetch both user data and user todays daily log data, which can be used in the app

  #### Need to do:

  - Add extra fields when the account is created such as goalWeight or potentially allow them to pick a manual input or ideal weight calc [X]
  - Start using the fetched data in the app [X]

### 04/10/25

- Added to UserDailyLogs; Calories (Be able to track calorie intake), logDate (Now it stores local date)

- Added to UserProfile; currentWeight to be able to refer back to that and keep it updated of the most recent weight
- Updated to UserProfile; bmrActive -> maintenance

- Fixed some of the issue not showing the userData on the frontEnd, now showing Maintaince calories & Daily Target

  #### Need to do:

  - Previous to do aka add Target Weight [X]
  - Fix storing DailyLogs in mongo twice when new day so new log [X]
  - Fix Protein data as it maxs out on the protein goal instead of showing your current protein intake if above the protin goal [X]
  - Fix the graphs [X]
  - Add Target Date [Dont know if needed, will think about it] []
  - Figure out how to update currentWeight if updated in logs but still need to implement updating logs []
  - Add calorie tracker [X] + logs updating []
  - Add History to show all the logs []
  - Allow the person to update their UserProfile []
  - Recalibrate Maintaince Weight and other stuff maybe when changes are made to UserProfile or manually allow to recalibrate

### 05/10/25

- Added new field startingWeight to be able to track progress and added targetWeight for the user to input there desired goal weight or let it be automatically calculated aka ideaWeight
- Removed field USER in User not needed currently
- Added name to User to keep the users name so it can be used later
- Fixed the problem of double logging data when new day comes and dailyLog is hit
- Removed of the api hits as it was redundent for now in the frontend to the backend api/logs/daily
- Fixed one of the issues with the TrackerBar frontend component so now it can show progress for lossing, gaining weight and protein. Need to add time tracking maybe idk. Need to fix the right value to show target weight
- Fixed some of the values being displayed in the frontEnd

### 06/10/25

- Added a way to retrive weeklyLogs by UserId

  ### To Do:

  - Stop the api getting called multiple times e.g api/logs/weeklyLogs x6 and api/user/me x2

### 07/10/25

- The calorie Bar seems to work, but not sure if I want it to show 0 calories consumed if it is logged. Need to fix Avg Intake as it counts the 0 Calories giving a bad reading [X]
- Changes the way data is passed in the api call:
  -- Combined Weekly logs with UserProfile and removed recentLogs.
  -- Changes weekly logs so it's zero index is the latest log
- Adjusted the front end to the new data passed

### 08/10/25

- Avg Intake for calories now doesnt include logs with 0 in the calculation
- Added a POST API for protein tracker to update the DB in the most recent log of Protein Intake, allowing for it to be tracked and saved. Both Add & Edit

  ## To Do:

  - Do the prevoius To Do's
