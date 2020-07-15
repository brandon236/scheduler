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

import { useApplicationData } from "hooks/useApplicationData"


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Brooke Myer Miller",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcom",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Brandon Macleod",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   }
// ];

export default function Application(props) {
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {}
  // });
  const {
    state, 
    setDay,
    bookInterview,
    deleteInterview 
  } = useApplicationData();


  // function bookInterview(id, interview) {
  //   //console.log(id, interview);
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   console.log(appointments);
  //   return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
  //  .then(() => {
  //   setState({
  //     ...state,
  //     appointments
  //   });
  //  });
  // }

  // function deleteInterview(id, interview){
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   console.log(appointments);
  //   return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  //  .then(() => {
  //   setState({
  //     ...state,
  //     appointments
  //   });
  //  });
  // }
  
  // const setDay = day => setState({ ...state, day});

  // //const setDays = days => setState(prev => ({ ...prev, days }));

  // useEffect(() => {
  //   Promise.all([
  //     Promise.resolve(axios.get("http://localhost:8001/api/days")),
  //     Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
  //     Promise.resolve(axios.get("http://localhost:8001/api/interviewers")),
  //   ]).then((all) => {
  //     setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  //   });
  // }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);
  //console.log(interviewers);


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
          <DayList 
          days={state.days}
          day={state.day}
          setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {
        appointments.map(appointment => {
          const interview = getInterview(state, appointment.interview)
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewers}
              bookInterview = {bookInterview}
              deleteInterview = {deleteInterview}
            />
          );
        })
      }
        {/* <Appointment 
          key="last"
          time="5pm"
          interviewers={interviewers}
        /> */}
      </section>
    </main>
  );
}
