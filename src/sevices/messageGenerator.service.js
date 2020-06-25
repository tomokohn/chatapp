
import React from "react";
import Message from "../components/Feed/Message/Message";
import {
  MAYA_GREETING_RETURN_PART_ONE,
  MAYA_GREETING_RETURN_PART_TWO,
  MAYA_HAVE_NAME_PART_ONE,
  MAYA_HAVE_NAME_PART_TWO
} from "../cosnts";

export const composeMessage  = ({text, isBot, last, showAvatar, key}) => (
  <Message text={text}
           last={last}
           isBot={isBot}
           showAvatar={showAvatar}
           key={key}
  />
);

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const botGreeting = (name, firstTime) => {
  const parsedName = capitalize(name.split(' ')[0]);
  return `${firstTime ? MAYA_HAVE_NAME_PART_ONE : MAYA_GREETING_RETURN_PART_ONE} ${parsedName}${ firstTime ? MAYA_HAVE_NAME_PART_TWO : MAYA_GREETING_RETURN_PART_TWO}`;
};

export const randomAnswer = (answersArr, lastAnswerI) => {
  let randomIndex = lastAnswerI;
  while (randomIndex === lastAnswerI) {
    randomIndex = Math.floor(Math.random() * ((answersArr.length -1) - 0 + 1));
  }
  return answersArr[randomIndex];
};
