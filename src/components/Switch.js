import React from "react";

const Switch = ({ isOn, handleToggle }) => {
  return (
    <div className="search-film__toggle">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="search-film__toggle-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && "#06D6A0" }}
        className="search-film__toggle-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`search-film__toggle-button`} />
      </label>
      <span className="search-film__toggle-name">Короткометражки</span>
    </div>
  );
};

export default Switch;
