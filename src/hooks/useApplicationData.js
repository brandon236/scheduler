import axios from "axios";

import { useState, useEffect } from "react";

export function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Saves the new interview data using an axios put request
  function bookInterview(id, interview) {
    let days = [];
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        return axios.get("http://localhost:8001/api/days"); //New data call to update the spots remaining
      })
      .then((response) => {
        days = response.data;
        setState({
          ...state,
          days,
          appointments,
        });
      });
  }

  //Removes the interview data using axios delete
  function deleteInterview(id, interview) {
    let days = [];
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        return axios.get("http://localhost:8001/api/days"); //Makes a get request to update the spots remaining
      })
      .then((response) => {
        days = response.data;
        setState({
          ...state,
          days,
          appointments,
        });
      });
  }

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, deleteInterview };
}
