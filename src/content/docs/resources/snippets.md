---
title: Snippets
---
## Watermark images
```bash
// watermark.sh
#!/bin/#!/bin/bash
for i in ./*; do
    composite -dissolve 55% -gravity Center -quality 100 logo.png "$i" "results/$(echo $i | cut -d '/' -f 2)"
done
```
Create the file watermark.sh, inside the folder, and create folder results, inside the same folder, excute file with sh watermark.sh, replace logo.png with your logo.

## Open source calendar

* Use from the terminal with broot, read thread `List of Resources`
* Execute: sh calendar-next-ten-years.sh 
* It wil create a folder structure for your next ten years with twelve months, the according days, and 24 md files one per hour inside the folder of the day, enabling you to add events to your calendar.
```bash
# calendar-next-ten-years.sh
#!/bin/bash

# Get the current year
CURRENT_YEAR=$(date +%Y)
END_YEAR=$((CURRENT_YEAR + 10))

for YEAR in $(seq $CURRENT_YEAR $END_YEAR); do
    for MONTH in $(seq -w 01 12); do
        for DAY in $(seq -w 01 31); do
            # Calculate the date
            DATE="$YEAR-$MONTH-$DAY"
            # Check if the date is valid
            if date -d "$DATE" >/dev/null 2>&1; then
                # Get the day of the week (e.g., Monday)
                DAY_OF_WEEK=$(date -d "$DATE" +%A)
                # Create the directory structure
                mkdir -p "$YEAR/$MONTH/$DAY-$DAY_OF_WEEK"
                for HOUR in $(seq -w 00 23)
                do
                    # Create the twenty four md files, one per hour.
                    touch "$YEAR/$MONTH/$DAY-$DAY_OF_WEEK/$HOUR.md"
                done
            fi
        done
    done
done

```

## Input Text to Circular Shape
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Circular Text Input</title>
  <style>
    body {
      display: grid;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .circularTextInner {
      margin: auto;
      width: 25vw;
      height: 25vw;
      display: flex;
      position: relative;
    }
    .circunference {
      width: 10px;
      height: 50%;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      transform-origin: bottom center;
      color: #00596d;
      font-size: 20px;
    }
    .inputField {
      margin: auto;
      width: 25vw;
      height: auto;
      display: flex;
      position: relative;
      top: 100px;
      padding: 10px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div>
    <div class="circularTextInner" id="circularTextInner"></div>
    <input class="inputField" type="text" id="inputField" placeholder="Enter text here">
  </div>
  
  <script>
    function createCircularText(text) {
      const parentInner = document.getElementById('circularTextInner');
      parentInner.innerHTML = '';
      const len = text.length;
      for (let i = 0; i < len; i++) {
        const paragraph = document.createElement("p");
        paragraph.className = "circunference";
        paragraph.style = "transform:rotate(" + (360 / len) * i + "deg);";
        const charNode = document.createTextNode(text.charAt(i));
        paragraph.appendChild(charNode);
        parentInner.appendChild(paragraph);
      }
    }

    createCircularText("Hello Circular Text World. ");

    document.getElementById('inputField').addEventListener('input', function () {
      const inputText = this.value;
      createCircularText(inputText);
    });
  </script>
</body>
</html>
```
