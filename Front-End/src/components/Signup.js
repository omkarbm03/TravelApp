import React, { Component, useState } from "react";
import M from "materialize-css";
import Swal from "sweetalert2";
import { register } from "../Api";
import { SetCookie, jwtTokenCookie, userCookie } from "../Cookies";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      email: "",
      dob: "",
      firstName: "",
      lastName: "",
      passwordVerification: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(key, val) {
    this.stateBakcup = this.state;
    this.stateBakcup[key] = val;
    this.setState(this.stateBakcup);
  }

  initializeComponents() {
    var elems = document.querySelectorAll(".slider");
    console.log("Elems :", elems);
    var instances = M.Slider.init(elems, { indicators: false, interval: 5000 });

    var elems = document.querySelectorAll(".datepicker");
    var instances = M.Datepicker.init(elems, {});
  }

  onSignUp(event) {
    console.log("Event Called", this);
    document.getElementById("submitBtn")?.setAttribute("disabled", "true");
    // if (this.state.password != this.state.passwordVerification) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Password in both the input fields were not same.",
    //     allowOutsideClick: false,
    //   });
    //   document.getElementById("submitBtn")?.removeAttribute("disabled");
    //   return;
    // }
    register(
      this.state.firstName,
      this.state.lastName,
      "1997-06-15",
      this.state.email,
      this.state.password
    ).then((val) => {
      console.log(val);
      if (val[0]) {
        SetCookie(jwtTokenCookie, val[1].token);
        SetCookie(userCookie, val[1].id);
        window.location = "/home";
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: val[1],
          allowOutsideClick: false,
        });
      }
      document.getElementById("submitBtn")?.removeAttribute("disabled");
    });
  }

  componentDidMount() {
    console.log("Component did moutn called");
    if (document.readyState !== "loading") {
      this.initializeComponents();
    } else {
      document.addEventListener("DOMContentLoaded", this.initializeComponents);
    }
  }
  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <div
          className="slider fullscreen"
          style={{ width: "100%", height: "100%", zIndex: -1 }}
        >
          <ul className="slides">
            <li>
              <img src="https://www.tajmahalinagra.com/wp-content/uploads/2020/02/Taj-Mahal-Banner-55.jpg" />
              <div
                class="caption left-align"
                style={{ top: "10%", left: "18%" }}
              >
                <h1 className="black-text text-lighten-3">Taj Mahal !</h1>
                <h3 className="light grey-text text-darken-3">
                  A white pearl in the light blue sky's ocean.
                </h3>
              </div>
            </li>
            <li>
              <img src="https://www.pixelstalk.net/wp-content/uploads/2016/08/HD-World-Travel-Desktop-Background.jpg" />
              <div class="caption left-align" style={{ top: "10%" }}>
                <h1 className="white-text text-darken-3">Marina Bay Sands !</h1>
                <h3 className="light grey-text text-lighten-3">
                  Observation deck providing panoramic views across the bay
                </h3>
              </div>
            </li>
            <li>
              <img src="https://tdr.aaa.com/tdr-images/variation/229882?ratio=16:9&rwidth=1600" />
              <div class="caption right-align" style={{ top: "10%" }}>
                <h1 className="black-text text-darken-3">The Colosseum !</h1>
                <h3 className="light grey-text text-darken-4">
                  In the city of love, the Colosseum stands tall
                </h3>
              </div>
            </li>
            <li>
              <img src="https://tdr.aaa.com/tdr-images/variation/151238?ratio=16:9&rwidth=1600" />
              <div class="caption right-align" style={{ top: "10%" }}>
                <h1 className="grey-text text-darken-3">The Grand Canal !</h1>
                <h3 className="light teal-text text-darken-4">
                  Like fabrics of enchantment pil'd to heaven
                </h3>
              </div>
            </li>
          </ul>
        </div>
        <div className="container" style={{ height: "100%", width: "100%" }}>
          <div className="row" style={{ height: "100%", width: "100%" }}>
            <div
              className="col s10 m6 l4 xl4 offset-s1 offset-m3 offset-l4 offset-xl4 valign-wrapper"
              style={{ height: "100%", width: "100%" }}
            >
              <div className="" style={{ zIndex: 0 }}>
                <div
                  className="card large z-depth-4"
                  style={{ borderRadius: "15px", height: "600px" }}
                >
                  <div className="card-content">
                    <p className="flow-text black-text bold">
                      Welcome to Travel Plannr
                    </p>
                    <br />
                    <p>Adventure starts after registering 🚀</p>
                    <br />

                    <div className="input-field">
                      <input
                        id="first_name"
                        type="text"
                        className="validate"
                        onChange={(evt) =>
                          this.updateState("firstName", evt.target.value)
                        }
                      />
                      <label for="first_name">FirstName</label>
                    </div>

                    <div className="input-field">
                      <input
                        id="last_name"
                        type="text"
                        className="validate"
                        onChange={(evt) =>
                          this.updateState("lastName", evt.target.value)
                        }
                      />
                      <label for="last_name">Last Name</label>
                    </div>
                    <div className="input-field">
                      <input
                        id="email"
                        type="email"
                        className="validate"
                        onChange={(evt) =>
                          this.updateState("email", evt.target.value)
                        }
                      />
                      <label for="email">Email Address</label>
                    </div>
                    <div className="input-field">
                      <input
                        id="password"
                        type="password"
                        className="validate"
                        onChange={(evt) =>
                          this.updateState("password", evt.target.value)
                        }
                      />
                      <label for="password">Password</label>
                    </div>
                    <div className="input-field">
                      <input
                        id="birthdate"
                        type="text"
                        className="datepicker"
                        onChange={(evt) =>
                          this.updateState("firstName", evt.target.value)
                        }
                      />
                      <label for="birthdate">Date of Birth</label>
                    </div>
                    <div className="center-align">
                      <a
                        className="waves-effect waves-light btn-large"
                        style={{ width: "50%", borderRadius: "10px" }}
                        id="submitBtn"
                        onClick={this.onSignUp}
                      >
                        Register
                      </a>
                    </div>
                    <div
                      className="center-align"
                      style={{ paddingTop: "10px" }}
                    >
                      Already have an account? <a href="/login">Sign In</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
