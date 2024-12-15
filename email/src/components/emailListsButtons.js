import React from "react";

function EmailListsButtons({ getFilter, filter }) {
  return (
    <div style={{ display: "flex" }}>
      <div
        className={`${filter == "unread" ? "filter-button" : ""}`}
        onClick={() => {
          getFilter("unread");
        }}
        style={{ padding: "10px", margin: "10px" }}
      >
        Unread
      </div>
      <div
        className={`${filter == "read" ? "filter-button" : ""}`}
        onClick={() => {
          getFilter("read");
        }}
        style={{ padding: "10px", margin: "10px" }}
      >
        Read
      </div>
      <div
        className={`${filter == "favorite" ? "filter-button" : ""}`}
        onClick={() => {
          getFilter("favorite");
        }}
        style={{ padding: "10px", margin: "10px" }}
      >
        Favorite
      </div>
    </div>
  );
}

export default EmailListsButtons;
