import React from "react";

import InterviewerListItem from "components/DayListItem";


export default function InterviewerList(props) {

    const interviewers = [
        { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
        { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
        { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
        { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
        { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
      ];

      const interviewList = props.interviewers.map(interviewer => {
        return (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.interviewer}
            setInterviewer={event => props.setInterviewer(interviewer.id)}
          />
        );
      });
  return interviewList;
}