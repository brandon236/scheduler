import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

const formatSpots = function (num) {
  if (num === 0) {
    return "no spots remaining";
  }
  if (num === 1) {
    return `${num} spot remaining`;
  }
  if (num > 1) {
    return `${num} spots remaining`;
  }
};

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  const numSpots = formatSpots(props.spots);
  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{numSpots}</h3>
    </li>
  );
}
