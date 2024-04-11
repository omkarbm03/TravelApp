import React, { Component } from "react";
import M from "materialize-css";
import CreateTrip from "./CreateTrip";
import { ClearCookie, jwtTokenCookie } from "../Cookies";

export default class NavBar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  initializeComponents() {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems, {});
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, {});
  }

  componentDidMount() {
    console.log("Component did moutn called");
    if (document.readyState !== "loading") {
      this.initializeComponents();
    } else {
      document.addEventListener("DOMContentLoaded", this.initializeComponents);
    }
  }

  logout(e) {
    e.preventDefault();
    ClearCookie(jwtTokenCookie);
    // else.p
    console.log("yo");
    window.location = "/login";
    window.location.replace("/");
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper white">
          <a
            href="/home"
            className="brand-logo black-text"
            style={{ paddingLeft: "50px" }}
          >
            Travel Comp OOD
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="#createTripModal" className="black-text modal-trigger">
                Create Trip
              </a>
            </li>
            <li>
              <a href="/trip" className="black-text">
                My Trips
              </a>
            </li>
            <li>
              <a href="/documents" className="black-text">
                Documents
              </a>
            </li>
            <li>
              <a href="/login" className="black-text" onClick={this.logout}>
                Log Out
              </a>
            </li>
          </ul>
        </div>

        <CreateTrip />
      </nav>
    );
  }
}
