import React from "react";
import { Link } from "react-router-dom";
import logo from "../../imgs/logo.png";
import "./menu.css";
export default function Menu() {
  const cart = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>
  );
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" className="imgMenu" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 lis">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  style={{ fontWeight: "bold" }}
                >
                  HOME
                </Link>
              </li>
            </ul>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "1rem",
              }}
            >
              <Link to="/cart" className="nav-link" style={{ fontWeight: "bold" }}>
                <button className="btn btn-primary" type="submit">
                  {cart}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
