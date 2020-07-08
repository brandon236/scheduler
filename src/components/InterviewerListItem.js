import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";



export default function InterviewerListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
  <li className="interviewers__item">
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.name}
  </li>
  );
}