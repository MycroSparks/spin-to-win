# Instructions

Use git clone, or just download the zip file from the github link.
Before running the project you have to use the "npm install" command in the projects root folder.
To run the project after all the steps above, simply use the "npm run dev" command.

# Documentation

It took me approximately 9h-11h to make this project. The thing that took most of my time was library version and compatibility issues, on which Id say I spent
more then half of the development time (redux-saga with typescript kept erroring so at the end I had to use the _any_ typing trick, react-pixi-fiber not working with create-react-app initialized projects, and so on). Other then that, the project was actually really fun, I enjoyed learning the basics of redux-saga and react-pixi-fiber, although I didn't have time to properly learn and read all the documentations and examples provided due to holidays and other obligations, but Id love to learn them fully at some point.

Things I would do differently if I had more time:

1. The most important step in my mind when undertaking these projects is usually planning - which technologies am I going to use, how do I want the app to function, what are the biggest focus points of the project and so on. For this project, I didn't really plan because I didn't have that much time to spare, so, if I were to do it over again, Id spend a few hours or a day planning and making tasks.
2. Better typing - currently the _symbols_ are a bit weird and untyped, so there's room for error if someone else were to start coding on the project. With more time, Id make sure that everything is typed and that there is no room for type errors no matter how many people work on the project.
3. Sounds - Id love to implement sound effects to the game, but it would take me a few more hours which I sadly don't have to spare.
4. Better animation algorithm - The current way it works is a bit hacky, and I'm not the biggest fan of it, but since I did the project with react-pixi-fiber at first, I didn't have that much time to re-write the animation fully and change it up when I implemented react-pixi-fiber. The issue right now is the fact that there's a re-render at the start of each _spin_, it's not noticeable but it does happen, and an ideal solution wouldn't have that issue.
5. More focus on file organization - as it is currently it's not horrible, but there's some questionable things. With more time and some focus on organizing it would be better.
6. Overall polish - Id love to spend some more time polishing the actual visuals of the app, make each column spin individually and then stop them 1by1 going from left to right, making a better winning animation instead of a simple popup with a text message and so on.
7. Spend more time learning these libraries - I'm fairly certain my use of redux-saga isn't ideal (I've used redux before through RxJS), so Id love to see better uses and practices with the library, as well as react-pixi-fiber, my solution here uses it, but ideally the entire app would be wrapped with a pixi canvas.
