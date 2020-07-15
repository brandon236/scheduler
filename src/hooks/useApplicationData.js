import axios from "axios";

import React, { useState, useEffect } from "react";


export function useApplicationData(props) {

   const [state, setState] = useState({
     day: "Monday",
     days: [],
     appointments: {}
   });

function bookInterview(id, interview) {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointments);
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
   .then(() => {
    setState({
      ...state,
      appointments
    });
   });
  }

  function deleteInterview(id, interview){
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointments);
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
   .then(() => {
    setState({
      ...state,
      appointments
    });
   });
  }
  
  const setDay = day => setState({ ...state, day});

  //const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers")),
    ]).then((all) => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return {state, setDay, bookInterview, deleteInterview}

}