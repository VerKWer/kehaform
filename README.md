# KEHA Form Reader and Writer
Form URL: https://asiointipalvelu.ahtp.fi/forms/2627047

Read data:
```
eval(await (await fetch("https://raw.githubusercontent.com/VerKWer/kehaform/master/readV1.js")).text())
```

## Usage
1. Go to the form URL (https://asiointipalvelu.ahtp.fi/forms/2627047) and fill in as much as you want/can.
2. To save your current state, open the developer tools (using `Ctrl+Shift+C`), go to the "Console" tab and put in
```
eval(await (await fetch("https://raw.githubusercontent.com/VerKWer/kehaform/master/readV1.js")).text())
```
3. A pop-up will open and you can just hit `Ctrl+C` to copy the already selected string. Store it somewhere (e.g.
Excel).
4. To restore the state again, go to the form URL again, open the developer tools console and paste in the previously
copied and stored-away string. Hitting `Enter` should re-fill the data.
