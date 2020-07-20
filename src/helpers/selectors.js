export function getAppointmentsForDay(state, day) {
  //Finds object with matching day
  let foundObject = state.days.find((object) => object.name === day);
  const appointmentArr = [];

  if (foundObject === undefined) {
    //If nothing was found then return an empty array
    return [];
  }

  //Goes through appointments array and returns the timeslots that have interviews scheduled
  for (const j of foundObject.appointments) {
    if (state.appointments[j] !== undefined) {
      appointmentArr.push(state.appointments[j]);
    }
  }
  return appointmentArr;
}

export function getInterviewersForDay(state, day) {
  //Finds object with matching day
  let foundObject = state.days.find((object) => object.name === day);
  const interviewArr = [];

  if (foundObject === undefined) {
    //If nothing was found then return an empty array
    return [];
  }

  //Goes through interviewers array and returns avaliable interviewers
  for (const j of foundObject.interviewers) {
    if (state.interviewers[j] !== undefined) {
      interviewArr.push(state.interviewers[j]);
    }
  }
  return interviewArr;
}

export function getInterview(state, interview) {
  const values = Object.values(state.interviewers);
  const studentObject = {};
  if (interview === null) {
    return null;
  }
  //Finds interviewer
  for (const i of values) {
    if (i.id === interview.interviewer) {
      studentObject.student = interview.student;
      studentObject.interviewer = i;
      return studentObject;
    }
  }
}
