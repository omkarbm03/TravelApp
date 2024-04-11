import React, { Component } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Trip from "./Trip";
import { getDestinations, getTripByUser, getTripByCollaborator } from "../Api";
import M from "materialize-css";

export default class MyTrips extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userTrips: null,
      collaboratorTrips: null,
      places: null,
    };

    this.getAllTripsByUser = this.getAllTripsByUser.bind(this);
    this.getAllTripsByUser();
    this.getAllTripsByCollaborator = this.getAllTripsByCollaborator.bind(this);
    this.getAllTripsByCollaborator();
    this.getAllPlaces = this.getAllPlaces.bind(this);
    this.getAllPlaces();
    this.initializeComponents = this.initializeComponents.bind(this);
  }

  getAllTripsByUser() {
    getTripByUser().then((val) => {
      if (val[0]) {
        this.setState((prevState) => ({
          ...prevState,
          loading: false,
          userTrips: val[1],
        }));
      }
    });
  }

  getAllTripsByCollaborator() {
    getTripByCollaborator().then((val) => {
      if (val[0]) {
        this.setState((prevState) => ({
          ...prevState,
          loading: false,
          collaboratorTrips: val[1],
        }));
      }
    });
  }

  getAllPlaces() {
    getDestinations().then((val) => {
      if (val[0]) {
        this.setState(
          (prevState) => ({
            ...prevState,
            loading: false,
            places: val[1],
          }),
          this.initializeComponents
        );
      }
    });
  }

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; i++) {
      rv[arr[i].Name] = arr[i]._id;
    }
    return rv;
  }
  onLocationAdded(el, t) {
    console.log(el, t);
  }
  initializeComponents() {
    var elems = document.querySelectorAll("#place-input"); // + this.id);

    let placeNames = this.toObject(this.state.places || []);
    console.log("Place Names: ", placeNames);
    var instances = M.Autocomplete.init(elems, {
      data: placeNames,
      onAutocomplete: this.onLocationAdded,
    });
    // instances.forEach((el) => el.updateData(placeNames));
  }
  componentDidUpdate() {
    if (document.readyState !== "loading") {
      this.initializeComponents();
    } else {
      document.addEventListener("DOMContentLoaded", this.initializeComponents);
    }
  }
  render() {
    console.log("State: ", this.state);
    if (this.state.loading) {
      return (
        <div>
          <h1 className="center-align"> You have no trips planned!! </h1>
        </div>
      );
    }

    let userTripsUI = [];
    if (this.state.userTrips?.length || 0 > 0) {
      for (var i = 0; i < this.state.userTrips.length; i++) {
        userTripsUI.push(
          <Trip trip={this.state.userTrips[i]} places={this.state.places} />
        );
      }
    }

    let colabTripsUI = [];
    if (this.state.collaboratorTrips?.length || 0 > 0) {
      for (var i = 0; i < this.state.collaboratorTrips.length; i++) {
        colabTripsUI.push(
          <Trip
            trip={this.state.collaboratorTrips[i]}
            places={this.state.places}
          />
        );
      }
    } else {
      colabTripsUI = (
        <h4 className="center-align">No one has collaborated on your trips</h4>
      );
    }
    return (
      <div>
        <NavBar />
        <h2 className="center-align">User Trips</h2>
        {userTripsUI}
        <h2 className="center-align">Collaborated Trips</h2>
        {colabTripsUI}
        <Footer />
      </div>
    );
  }
}
