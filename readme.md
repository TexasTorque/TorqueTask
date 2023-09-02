# TorqueTask

TorqueTask is an open source (MIT License), web based task management software. 
It takes inspiration from Jira and Monday.com, two popular, but proprietary, task management solutions.

TorqueTask was developed by [Texas Torque](https://texastorque.org) in 2023.

For all questions, comments, or concerns, reach out to [Justus Languell <jus@justusl.com>](https://justusl.com).

## Features/TODO

- [X] Basic fields: ID, name, project, details, start/end date, status, subteam.
- [X] View tasks in a table.
- [X] Create new tasks.
- [X] View/edit tasks.
- [X] Implement date selectors in the form.
- [X] Implement smart dropdowns for status and subteams.
- [X] Implement an auto ID system.
- [ ] Add a field and modifier for assignee.
- [ ] Add a field and control for block/blocks.
- [ ] Make viewable in a GAANT chart.
- [ ] About, user instructions, and help page.
- [ ] More advanced data validation.
- [ ] Make the header look good.
- [ ] Implement a query system.
- [ ] Make the first row editable to add fields quickly (like Monday).
- [ ] Implement a message system for each task (like Jira.)
- [ ] Add a user system.
- [ ] Create a CI/CD system.
- [ ] Create a graph view that shows tasks and their relation to eachother.
- [ ] Implement notifications.
- [ ] Convert projects to a smart dropdown where the user can add fields.
- [ ] Message system file uploads.
- [ ] Message system user mentioning.
- [ ] Support for multible organizations.

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
