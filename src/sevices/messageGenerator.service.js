
import React from "react";
import Message from "../Feed/Message/Message";

export const composeMessage  = ({text, isBot, last, showAvatar, key}) => (
  <Message text={text}
           last={last}
           isBot={isBot}
           showAvatar={showAvatar}
           key={key}
  />
);

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const botGreeting = (name) => {
  const parsedName = capitalize(name.split(' ')[0]);
  return `Nice to meet you ${parsedName}!`;
};
