import React from "react";
import Avatar from "./avatar";

const getDateStingFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; 

  return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
};

function EmailItem({ id, from, short_description, subject, date, onEMailItemCLicked, isFavrouite }) {
  return (
    <div className="email-item" onClick={()=>{onEMailItemCLicked({id, from, short_description, subject, date, isFavrouite})}}>
      <Avatar name={from.name || ""}/>
      <div style={{marginLeft : "0.5em"}}>
        <div>
          From: <strong>{from.email}</strong>
        </div>
        <div>
          Subject: <strong>{subject}</strong>
        </div>
        <div>{short_description}</div>
        <div>{getDateStingFromTimestamp(date) }<span style={{color: "var(--var-Accent)"}}>{isFavrouite? "  Favrouite":""}</span> </div>
      </div>
    </div>
  );
}

export default EmailItem;
