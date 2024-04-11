import React, { Component } from "react";
import Swal from "sweetalert2";
import { createTrip } from "../Api";
import M from "materialize-css";
import { fixedCustomer } from "../CustomerData";

export default class CreateTrip extends Component {
  constructor() {
    super();
    this.createTrip = this.createTrip.bind(this);
    this.updateState = this.updateState.bind(this);
    this.state = {
      budget: 0,
      startDate: "",
      errorMessage: "",
    };
  }
  updateState(key, val) {
    this.stateBakcup = this.state;
    this.stateBakcup[key] = val;
    this.setState(this.stateBakcup);
  }
  createTrip(e) {
    e.preventDefault();
    document.getElementById("submitBtn")?.setAttribute("disabled", "true");
    console.log(this.state);

    let errorMessage = document.getElementById("errorMessage");
    let today = new Date();
    let todayStr = today.toISOString().split("T")[0];
    if (this.state.budget < 100) {
      this.updateState("errorMessage", "Minimum budget should be $100");
      errorMessage.style.display = null;
    } else if (this.state.startDate === "") {
      this.updateState("errorMessage", "Start Date cannot be empty");
      errorMessage.style.display = null;
    } else if (this.state.startDate <= todayStr) {
      this.updateState("errorMessage", "Start Date cannot be in the past");
      errorMessage.style.display = null;
    } else {
      createTrip(this.state.budget, this.state.startDate).then((val) => {
        if (val[0]) {
          console.log("Trip created");
          window.location = "/trip";
          errorMessage.style.display = "None";
        } else {
          this.updateState("errorMessage", val[1]);
          errorMessage.style.display = null;
        }
      });
    }
    document.getElementById("submitBtn")?.removeAttribute("disabled");
  }
  render() {
    return (
      <div
        className="modal black-text"
        id="createTripModal"
        style={{ width: "50%", height: "30%" }}
      >
        <div className="modal-content">
          <div className="row">
            <form class="col s12">
              <h2 className="center-align">Create a trip</h2>
              <div className="row">
                <h3 className="col m5">Set a budget</h3>
                <div className="input-field col m6 offset-m1">
                  <input
                    id="budget"
                    name="budget"
                    type="number"
                    className="validate"
                    min="100"
                    onChange={(evt) =>
                      this.updateState("budget", evt.target.value)
                    }
                  />
                  <label for="budget">Budget</label>
                </div>
              </div>

              <div className="row">
                <h3 className="col m5">Trip Start Date</h3>
                <div className="input-field col m6 offset-m1">
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="validate"
                    onChange={(evt) =>
                      this.updateState("startDate", evt.target.value)
                    }
                  />
                  <label for="startDate">Trip Start Date</label>
                </div>
              </div>

              <div
                id="errorMessage"
                className="red-text center-align"
                style={{ display: "none", marginBottom: "10px" }}
              >
                {this.state.errorMessage}
              </div>

              <div className="row center-align">
                <div className="col m4 s8 offset-s2 offset-m4">
                  <button
                    id="submitBtn"
                    class="btn waves-effect"
                    type="submit"
                    name="action"
                    onClick={this.createTrip}
                  >
                    Create Trip
                    <i class="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
