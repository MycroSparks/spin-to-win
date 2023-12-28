# Instructions

Command to run the project: 'npm run dev'

# Documentation

My approach here was mostly to get a good app finished as soon as possible, ideally, with more time, everything in the app would be dynamic and configurable
through different means (either more constants and less hardcoded numbers, or a different app that writes configurations into a json, and this app would import
that json as its global config).

The initial iteration didn't use react-pixi-fiber, but I decided to give it a try and learn the basics of it, so the implemntation of it isn't full - it's
mostly react, with a single <Stage> element for the actual graphics part of the game. Again, ideally everything would be a single <Stage>, even the _header_ and
_footer_ of the app, but for the sake of this test I felt like this demonstrates that I can learn react-pixi-fiber.

The amount of time it took me is probably between 14-20 hours, but it could've been faster had I not used redux-saga (lost a lot of time setting the library up
because of it being incompatible with a lot of other library versions + typescript) and if it wasn't the holiday season (could barely get 2-3hours to spare on most days).

Also the animations could be implemented in a better way, and the approach of the games functionality could be cleaner, but I wanted to try out finding a solution
on my own, without consulting other Slot Machine projects/solutions. With more time to plan, it would've ended up better, but this should be good enough, since it can be built upon without having any core issues within (configurable rows, columns, result is tied to what the player sees after the roll stops, etc.).

If I had more time to spend on this project, I would definitely implement sounds, try and experiment a bit with react-pixi-fiber and wrap the entire app within its canvas, organize the files and components better (could split components into smaller, easier to understand ones) and dedicate some time to type the _symbol_ dictionaries better so they're easier to use for anyone working on the project. Id also change the approach of _spinning_, since right now there is a small issue of the displayed images re-rendering after each spin click because the matrix changes. Lastly, Id try to get a bit more polish in the _spinning_ by starting off the animation slower, then speeding it up, and then slowing it down again at the end for more suspense.
