import axios from "axios";

import React, { useState, useEffect } from "react";


export function useApplicationData(props) {

   const [state, setState] = useState({
     day: "Monday",
     days: [],
     appointments: {},
     interviewers: {}
   });

function bookInterview(id, interview) {
    //console.log(id, interview);
    let days = [];
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
     .then(() => {
        return axios.get("http://localhost:8001/api/days");
      })
    .then((response) => {
      days = response.data;
      setState({...state, days, appointments});
    })
  }


  function deleteInterview(id, interview){
    let days = [];
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
      return axios.get("http://localhost:8001/api/days");
    })
   .then((response) => {
    days = response.data;
    setState(prev => ({
      ...state, days,
      appointments
    }));
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
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return {state, setDay, bookInterview, deleteInterview}

}