import React from "react";
import { getDateStingFromTimestamp } from "../utils";
import Avatar from "./avatar";

function EmailBody({ emailData, getFavorite, emailHeadder }) {
  console.log({ emailHeadder, emailData });

  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "2em" }}>
            <Avatar name={emailHeadder.from?.name?.[0] || ""} />
          </div>
          <div style={{ textAlign: "left" }}>
            <h1 className="card-title">{emailHeadder.subject}</h1>
            <span className="card-date">
              {getDateStingFromTimestamp(emailHeadder.date)}
            </span>
          </div>
        </div>
        <button
          className="card-button"
          onClick={() => {
            getFavorite(emailData?.id);
          }}
        >
          {emailHeadder.isFavrouite ? "Remove favorite" : "Mark as favorite"}
        </button>
      </div>

      <div
        style={{ padding: "3em", textAlign: "left" }}
        dangerouslySetInnerHTML={{
          __html: emailData?.body,
        }}
      />
    </div>
  );
}

export default EmailBody;
