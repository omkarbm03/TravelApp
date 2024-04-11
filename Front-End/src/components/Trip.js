import React, { Component } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import {
  addCollaboratorApi,
  DownloadPDF,
  getTripById,
  updateTrip,
} from "../Api";
import M from "materialize-css";
import Swal from "sweetalert2";
import fileDownload from "react-file-download";
// import queryString from "query-string";
// import { withRouter } from "react-router-dom";

export default class Trip extends Component {
  constructor(props) {
    super(props);
    // console.log("Props: ", props);
    this.id = this.props.trip._id;
    this.state = { error: false, trips: this.props.trip };
    this.remainingBudget = 0;
    this.previousRemainingBudget = 0;
    this.initializeComponents = this.initializeComponents.bind(this);
    this.onLocationAdded = this.onLocationAdded.bind(this);
    this.toObject = this.toObject.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);
    this.addCollaborator = this.addCollaborator.bind(this);
    this.loadTrip = this.loadTrip.bind(this);
  }

  initializeComponents() {
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, {});

    var elems = document.querySelectorAll("#place-input-" + this.id); // + this.id);

    let placeNames = this.toObject(this.props.places || []);
    let locationNameIdMap = this.toObject(this.props.places || [], true);
    this.locationNameIdMap = locationNameIdMap;
    // console.log("Place Names: ", placeNames);
    var instances = M.Autocomplete.init(elems, {
      data: placeNames,
      onAutocomplete: this.onLocationAdded,
    });
    this.autoCompleteInstance = instances[0];
  }

  downloadPdf() {
    DownloadPDF(this.state.trips).then((val) => {
      if (val[0]) {
        fileDownload(val[1], this.state.trips._id + ".pdf");
      } else {
        Swal.fire({
          title: "Oops!! Download failed",
          text: val[1],
          icon: "error",
        });
      }
    });
  }

  onDelete(el) {
    let locationId = el.target.dataset.placeId;
    let locationRemovedTrip = this.state.trips.placesToVisit.filter((el) => {
      return el._id != locationId;
    });
    let newTrip = this.state.trips;
    newTrip.placesToVisit = locationRemovedTrip;
    this.setState((prevState) => ({
      ...prevState,
      trips: newTrip,
    }));
    updateTrip(newTrip);
  }

  toObject(arr, makeMap = false) {
    var rv = {};
    // var locationNameIdMap = {};
    for (var i = 0; i < arr.length; i++) {
      if (makeMap) {
        rv[arr[i].Name] = arr[i];
      } else {
        rv[arr[i].Name] = null;
      }
      //   locationNameIdMap[arr[i].Name] = arr[i]._id;
    }
    return rv;
  }
  onLocationAdded(el) {
    let locationid = this.locationNameIdMap[el];
    // console.log(locationid);
    let trip = this.state.trips;
    trip.placesToVisit.push(locationid);
    updateTrip(trip).then(this.loadTrip);
    this.forceUpdate();
    console.log(document.getElementById("place-input-" + this.id).val); //.val = "";
  }

  addCollaborator(event) {
    let email = document.getElementById("collaborator-input-" + this.id).value;
    addCollaboratorApi(this.props.trip, email).then((val) => {
      if (val[0]) {
        this.loadTrip();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: val[1],
        });
      }
    });
  }

  componentDidMount() {
    if (document.readyState !== "loading") {
      this.initializeComponents();
    } else {
      document.addEventListener("DOMContentLoaded", this.initializeComponents);
    }
  }

  loadTrip() {
    console.log("Loading trip");
    getTripById(this.state.trips._id).then((val) => {
      //   console.log(val);
      if (val[0] === false) {
        // this.setState(prevState=>({...prevState});
      } else {
        this.setState((prevState) => ({
          ...prevState,
          trip: val[1],
          error: false,
        }));
        this.forceUpdate();
      }
    });
  }

  render() {
    // console.log(this.state);
    if (this.state.error) {
      return <div>Oops something went wrong.</div>;
    }
    let colaboratorui = "";
    if ((this.state.trips?.collaborators?.length || 0) > 0) {
      let collaborators = [];
      for (var i = 0; i < this.state.trips.collaborators.length; i++) {
        var colab = this.state.trips.collaborators[i];
        console.log("Colab: ", colab);
        collaborators.push(
          <li className="collection-item avatar">
            <img
              src="https://static.vecteezy.com/system/resources/previews/007/409/979/original/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg"
              className="circle"
            />
            <span className="title">
              {colab.firstname} {colab.lastname}
            </span>
            <p>{colab.email}</p>
          </li>
        );
      }
      colaboratorui = (
        <div className="row">
          <ul class="collection">{collaborators}</ul>
        </div>
      );
    }
    let placesToVisitUI = "";

    if ((this.state.trips?.placesToVisit?.length || 0) > 0) {
      var placesUI = [];
      for (var i = 0; i < this.state.trips.placesToVisit.length; i++) {
        var place = this.state.trips.placesToVisit[i];
        placesUI.push(
          <li>
            <div className="collapsible-header">
              <i class="material-icons large">place</i>
              <p style={{ fontStyle: "bold" }}>
                <strong>{place.Name}</strong>
              </p>
              <span className="new badge" data-badge-caption="">
                $ {place.EntranceFeeINR}
              </span>
              <i
                class="material-icons"
                data-place-id={place._id}
                onClick={this.onDelete}
              >
                delete
              </i>
            </div>
            <div className="collapsible-body">
              <table className="striped centered highlight">
                <tbody>
                  <td>
                    <strong>Type</strong>
                  </td>
                  <td>{place.Type}</td>
                </tbody>
                <tbody>
                  <td>
                    <strong>City</strong>
                  </td>
                  <td>{place.City}</td>
                </tbody>
                <tbody>
                  <td>
                    <strong>State</strong>
                  </td>
                  <td>{place.State}</td>
                </tbody>
                <tbody>
                  <td>
                    <strong>Zone</strong>
                  </td>
                  <td>{place.Zone}</td>
                </tbody>
                <tbody>
                  <td>
                    <strong>Establishment Year</strong>
                  </td>
                  <td>{place.EstablishmentYear}</td>
                </tbody>
                <tbody>
                  <td>
                    <strong>Time Needed To Visit</strong>
                  </td>
                  <td>{place.TimeNeededToVisit}</td>
                </tbody>
                <tbody>
                  <td>
                    <strong>Google Review Rating</strong>
                  </td>
                  <td>{place.GoogleReviewRating}</td>
                </tbody>
                <tbody>
                  <td>
                    <strong>Airport With 50 km Radius</strong>
                  </td>
                  <td>{place.AirportWith50kmRadius}</td>
                </tbody>
                <tbody>
                  <td>
                    <strong>Significance</strong>
                  </td>
                  <td>{place.Significance}</td>
                </tbody>
                <tbody>
                  <td>
                    <strong>Best Time To Visit</strong>
                  </td>
                  <td>{place.BestTimeToVisit}</td>
                </tbody>
              </table>
            </div>
          </li>
        );
      }
      placesToVisitUI = (
        <ul
          className="collapsible popout"
          style={{
            // width: "90%",
            // marginLeft: "5%",
            marginBottom: "20px",
          }}
        >
          {placesUI}
        </ul>
      );
    }
    let previousRemainingBudget = this.remainingBudget;
    this.remainingBudget = this.state.trips?.budget || 0;
    for (let i = 0; i < (this.state.trips?.placesToVisit.length || 0); i++) {
      var places = this.state.trips.placesToVisit[i];
      //   console.log("Remaining budget: ", places, this.state.trips);
      this.remainingBudget -= places.EntranceFeeINR || 0;
    }
    if (previousRemainingBudget >= 0 && this.remainingBudget < 0) {
      Swal.fire({
        icon: "error",
        title: "Budget Exceeded",
        text: "You have exceeded you trip budget.",
        allowOutsideClick: false,
      });
    }
    let textColor = "";
    if (this.remainingBudget < 0) {
      textColor = "red-text";
    }
    let collaboratorInputId = "collaborator-input-" + this.id;
    let placesInputId = "place-input-" + this.id;
    return (
      <div
        className="container z-depth-4"
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <div className="row" style={{ margin: "0.5rem 0 1rem 0" }}>
          <div
            className="col s12 m6 l4 center-align"
            style={{ padding: "10px" }}
          >
            <h2>
              {this.state.trips?.tripCreator?.firstname}{" "}
              {this.state.trips?.tripCreator?.lastname}
            </h2>
            <p>Trip Creator</p>
          </div>
          <div
            className="col s12 m6 l4 center-align"
            style={{ padding: "10px" }}
          >
            <h2>{this.state.trips.tripDate.split("T")[0]}</h2>
            <p>Start Date</p>
          </div>
          <div className="col s12 m6 l4 center-align">
            <div style={{ padding: "10px", marginTop: "25px" }}>
              <h5>
                <strong>Allocated Budget: </strong> $ {this.state.trips.budget}
              </h5>
              <h5 className={textColor}>
                <strong>Remaining Budget: </strong> $ {this.remainingBudget}
              </h5>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s10 m4 offfset-m6 l3 offset-l4">
            <a class="waves-effect btn right" onClick={this.downloadPdf}>
              <i class="material-icons left">download</i>Download PDF
            </a>
          </div>
        </div>
        <div
          className="row"
          style={{ paddingLeft: "25px", paddingRight: "25px" }}
        >
          <div className="col s12 l3">
            <h3 className="left-align">Collaborators</h3>
          </div>
          <div className="col s8 l7" style={{ marginTop: "15px" }}>
            <div className="input-field col s12">
              <i className="material-icons prefix">people</i>
              <input type="text" id={collaboratorInputId} />
              <label for={collaboratorInputId}>Add collaborators</label>
            </div>
          </div>
          <div className="col s4 l2" style={{ marginTop: "30px" }}>
            <a class="waves-effect btn right" onClick={this.addCollaborator}>
              <i class="material-icons left">add</i>Add
            </a>
          </div>
        </div>

        {colaboratorui}

        <div
          className="row"
          style={{ paddingLeft: "25px", paddingRight: "25px" }}
        >
          <div className="col s12 l3">
            <h3 className="left-align">Places To Visit</h3>
          </div>
          <div className="col s12 l9" style={{ marginTop: "15px" }}>
            <div className="input-field col s12">
              <i className="material-icons prefix">place</i>
              <input type="text" id={placesInputId} class="autocomplete" />
              <label for={placesInputId}>Add new locations</label>
            </div>
          </div>
        </div>

        <div className="row">{placesToVisitUI}</div>
      </div>
    );
  }
}

// export default withRouter(Trip);
