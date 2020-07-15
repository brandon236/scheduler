import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

import Form from "components/Appointment/Form";

import Status from "components/Appointment/Status";

import Confirm from "components/Appointment/Confirm";

import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteItem() {
    const interview = null
    console.log(props.id);
    transition(DELETING);
    props.deleteInterview(props.id, interview)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  function confirmDelete() {
    transition(CONFIRM)
  }

  function editButton() {
    console.log(props)
    transition(EDIT)
  }

  return (
    <React.Fragment>
      <Header 
        time={props.time}
      />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirmDelete}
        onEdit={editButton}
      />
    )}
    {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />
    )}
    {mode === EDIT && (
      <Form 
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />
    )}
    {mode === SAVING && (
      <Status 
        message="Saving"
      />
    )}
    {mode === DELETING && (
      <Status 
        message="Deleting"
      />
    )}
    {mode === CONFIRM && (
      <Confirm 
        message="Are you sure you want to delete this appointment?"
        onConfirm={deleteItem}
        onCancel={back}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error 
        message="Could not create appointment"
        onError = {() => back()}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error 
        message="Could not cancel appointment"
        onError = {() => back()}
      />
    )}
    </React.Fragment>
  )
};