import React from 'react';
//import './Notification.scss';

export default function Notification({ message }) {
  return message ? <div className="notification">{message}</div> : null;
}
