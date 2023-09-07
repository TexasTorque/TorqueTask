# TorqueTask

TorqueTask is an open source (MIT License), web based task management software. 
It takes inspiration from Jira and Monday.com, two popular, but proprietary, task management solutions.

TorqueTask was developed by [Texas Torque](https://texastorque.org) in 2023.

For all questions, comments, or concerns, reach out to [Justus Languell \<jus@justusl.com\>](https://justusl.com).

## Code

TorqueTask is written in TypeScript.
The frontend uses ReactJS and the backend uses Express.
Firestore is used as the database.

### Server

The server code is at root level in `./src`.

To compile and run the server, use `npm run full`.

To run the already compiled server, use `npm run serve`.

If you want to build the server and not run it, use `npm run build`.

### Client

The client code is in the `./client` directory at `./client/src`.

To run the development version of the frontent, use `npm run start`.

To build the production frontent, use `npm run build`.
