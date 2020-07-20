# Interview Scheduler

The following program will allow users to schedule interviews with any available interviewer for that day. The left navigation bar contains a list of days from which the user can select from. Each day has a spots remaining that decreases every time a user books a new interview and increases if a user deletes an interview. Each days contains a list of appointments. Each timeslot either contains an appointment or a button to add a new appointment. Each appointment contains the student's name and the name of the interviewer. The user can create a new interview appointment, edit any pre-existing appointment, and delete any interview they want. 
	
The program was built using the React framework with HTML and CSS used for the front-end and Node, JSX, and SQL used for the back-end. The program makes use of API calls to update certain information including the days, appointments list, available interviewers, and the spots remaining for each day. It also made use of Storybook for testing each individual element as well as the React testing library and Cypress for more integration testing.


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
