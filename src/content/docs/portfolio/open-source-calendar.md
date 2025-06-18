---
title: Open Source Calendar
---

Your calendar for the next ten years, without distracting notifications, and with events and advanced edit and search.

## Steps
* Create folder calendar and file next-ten-years.sh
````bash
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
````
* Execute: sh calendar-next-ten-years.sh
* It wil create a folder structure for your next ten years with twelve months, the according days, and 24 md files one per hour inside the folder of the day, enabling you to add events to your calendar.
* Install broot
````bash
cargo install --locked --features clipboard broot
````
* Inside folder calendar and in the terminal open it with broot:
````bash
broot
````
Enjoy You has got the best calendar, blazingly fast, minimalism in design, optimized for advanced and production use cases.
