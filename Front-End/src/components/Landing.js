import React, { Component } from "react";
import M from "materialize-css";
import { logIn } from "../Api";
import Swal from "sweetalert2";
import { jwtTokenCookie, SetCookie, userCookie } from "../Cookies";

export default class Landing extends Component {
  initializeComponents() {
    var elems = document.querySelectorAll(".slider");
    console.log("Elems :", elems);
    var instances = M.Slider.init(elems, { indicators: false, interval: 5000 });
  }
  constructor() {
    super();
    this.state = {
      password: "",
      email: "",
    };
    this.onLogIn = this.onLogIn.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  onLogIn(event) {
    document.getElementById("submitBtn")?.setAttribute("disabled", "true");
    logIn(this.state.email, this.state.password).then((val) => {
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

  updateState(key, val) {
    console.log(val);
    this.stateBakcup = this.state;
    this.stateBakcup[key] = val;
    this.setState(this.stateBakcup);
    console.log(this.state);
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
                  className="card medium z-depth-4"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-content">
                    <p className="flow-text black-text bold">
                      Welcome to Travel Plannr
                    </p>
                    <br />
                    <p>
                      Please sign-in to your account and start the adventure
                    </p>
                    <br />
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
                    <div className="center-align">
                      <a
                        className="waves-effect waves-light btn-large"
                        style={{ width: "50%", borderRadius: "10px" }}
                        id="submitBtn"
                        onClick={this.onLogIn}
                      >
                        Log In
                      </a>
                    </div>
                    <div
                      className="center-align"
                      style={{ paddingTop: "10px" }}
                    >
                      New to our platform?{" "}
                      <a href="/signup">Create an account</a>
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
