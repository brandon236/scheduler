import React, { useState } from "react";


export function getAppointmentsForDay(state, day) {
  let found = false;
  let foundObject = {};
  const appointmentArr = [];
  for (const i of state.days) {
    if (i.name === day) {
      found = true;
      foundObject = i;
      break;
    }
  }
  if (!found) {
    return [];
  }
  for (const j of foundObject.appointments) {
    if (state.appointments[j] !== undefined) {
      appointmentArr.push(state.appointments[j]);
    }
  }
  return appointmentArr;
}

export function getInterview(state, interview) {
  const values = Object.values(state.interviewers);
  const studentObject = {};
  if (interview === null) {
    return null;
  }
  for (const i of values) {
    if (i.id === interview.interviewer) {
      studentObject.student = interview.student;
      studentObject.interviewer = i;
      return studentObject;
    }
  }
}