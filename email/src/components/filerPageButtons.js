import React from "react";

function FilterPageButton({ getSeletedPage, pageNo }) {
  return (
    <div style={{ display: "flex" }}>
      <div
        className={`${Number(pageNo) === 1 ? "filter-button" : ""}`}
        onClick={() => {
          getSeletedPage(1);
        }}
        style={{ padding: "10px", margin: "10px" }}
      >
        Page 1
      </div>
      <div
        className={`${Number(pageNo) === 2 ? "filter-button" : ""}`}
        onClick={() => {
          getSeletedPage(2);
        }}
        style={{ padding: "10px", margin: "10px" }}
      >
        Page 2
      </div>
    </div>
  );
}

export default FilterPageButton;
