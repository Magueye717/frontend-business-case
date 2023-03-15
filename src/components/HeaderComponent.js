/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderComponent(props) {
  const navigate = useNavigate();
  const handleGoTo = (url) => {
    navigate(url);
  };

  return (
    <nav className="navbar navbar-expand-lg ml-5 navbar-light bg-light">
      <a className="navbar-brand" role="button">
        <bold>Gozem</bold>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li
            className="nav-item active hover"
            role="button"
            onClick={() => handleGoTo("admin")}
          >
            <a className="nav-link">Admin</a>
          </li>
          <li
            className="nav-item"
            role="button"
            onClick={() => handleGoTo("tracker")}
          >
            <a className="nav-link">Tracker</a>
          </li>
          <li
            className="nav-item"
            role="button"
            onClick={() => handleGoTo("driver")}
          >
            <a className="nav-link">Driver</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
