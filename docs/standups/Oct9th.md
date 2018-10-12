## Oct 9th Standup Notes

### Overall Status

 - UI Wireframing complete.
 - Redux structure proof-of-concept complete.
 - Zome API implementation underway.
 - Entry Schemas underway.
 - Redux based middleware completion underway.

After all of the above,

 - App-wide integration begins, to merge everything into one.

### Team Status
#### @Cameron

 - Working on Entry Schemas
     - Rating Entry Schemas (notes in Oct8th Standup)
     - Status Entry Schemas (notes in Oct8th Standup)

#### @Przemek

 - Implemented the base redux-based structure and points to integrate code with Holochain.
 - Working on the Redux based middleware - implementing a State Management System for the Web Application. 
 - Working on setting the optimum directory structure for the overall application.

#### Me (@Suraj)

 - Implemented the Mockup UI for the frontend of the Rating app, the Rater's screen (Ratee's screen remaining).
 - Working on implementing the Zome functions defined in Oct8th's notes. 
     - Expected to work with the Entry Schemas constructed by @Cameron.
 - Once Zome functions are implemented, the Redux state management should also be set up - making it one universal integration step to integrate all code.

#### @Daniel

 - Working on building a Testing library for all the expected Zome API functions - unit tests for every callable.

#### @Lee

 - Implemented the initial DNA file, and the Zome function definitions into `dna.json` & filled in additional metadata in `properties_schema.json`.
 - Working on fixing discrepancies in DNA design whenever new changes arise from other members in the team. 
 - Also maintaining accuracy of Zome metadata w.r.t other team members.

#### @Shiv

 - Working on familiarizing with ReactJS & Redux along with @Przemek.


### Planning To-Do

 - Decide on Project Directory Structure - if converting to a re-usable library while including Redux state management. 
     - To pin down a scaffolding for such apps in the future.
 - Define apt endpoints in each team member's code for seamless integration. 
     - To be implemented once all are complete & consensus on necessary functions reached.
 - Once everything is integrated, decide on & implement what additional testing libraries may be necessary at the last minute.
 
 - Any more planning will be after the test run!