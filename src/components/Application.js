import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment";

import "components/Appointment/styles.scss";

import axios from "axios";

import { getAppointmentsForDay } from "helpers/selectors";

import { getInterviewersForDay } from "helpers/selectors";

import { getInterview } from "helpers/selectors";

import useVisualMode from "hooks/useVisualMode";

import { useApplicationData } from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state?.days} day={state?.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewers}
              bookInterview={bookInterview}
              deleteInterview={deleteInterview}
              data-test-id="appointment"
            />
          );
        })}
        {/* <Appointment 
          key="last"
          time="5pm"
          interviewers={interviewers}
        /> */}
      </section>
    </main>
  );
}
