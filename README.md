# where's waldo

A where's waldo game created with React for The Odin Project's JavaScript path.

From the homepage, enter your name in the box and select an image to play (currently only Hockey is functional).

Above the image you will see the list of items you must find. When you see one, click on it and select the item in the popup menu. If you are correct, the item will turn gray in the list above the image.

Once all items are found, a popup will appear with a button to submit your score. Ensure you have entered your name, and submit your score!

Click the leaderboard link to see the fastest times!

Potential future changes:
  - Currently the scoring system is contained client-side. Shifting this to the backend would be nice.
  - Adding multiple images to play. Most of the code supports this, the only thing that would need to be changed is how the data is pulled from Firebase (the paths are hard coded, and adding an image would need it to be dynamic)