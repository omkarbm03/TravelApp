import React, { Component } from "react";
import M from "materialize-css";
import InfoCard from "./InfoCard";
import Footer from "./Footer";
import NavBar from "./Navbar";
import CreateTrip from "./CreateTrip";

export default class HomePage extends Component {
  initializeComponents() {
    var elems = document.querySelectorAll(".parallax");
    var instances = M.Parallax.init(elems, {});
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
      <div>
        <NavBar />
        {/* <img src="https://breathingtravel.com/wp-content/uploads/2023/07/Angkor-Wat-Temples.jpg" /> */}
        <div className="parallax-container" style={{ height: "80vh" }}>
          <div className="parallax">
            <div>
              <img src="https://breathingtravel.com/wp-content/uploads/2023/07/Angkor-Wat-Temples.jpg" />
            </div>
          </div>
        </div>
        <div className="section white">
          <div class="row">
            <div class="col s12 m6 l4 offset-m3 offset-l2">
              <InfoCard
                title="Friendly Team"
                description="In adipisicing nisi proident enim tempor excepteur culpa sint quis laborum. Adipisicing nulla deserunt amet ad pariatur ut anim ullamco ipsum deserunt cillum anim. Nisi ullamco voluptate dolor aute est fugiat sunt ex."
                linkText="About Us"
                linkUrl="#"
                imageUrl="https://snowcattravel.com/get-image/main/Himalayan_Encounters_074-1637246860.jpeg"
              />
            </div>
            <div class="col s12 m6 l4">
              <InfoCard
                title="Perfect Places"
                description="In adipisicing nisi proident enim tempor excepteur culpa sint quis laborum. Adipisicing nulla deserunt amet ad pariatur ut anim ullamco ipsum deserunt cillum anim. Nisi ullamco voluptate dolor aute est fugiat sunt ex."
                linkText="Recommended Places"
                linkUrl="#"
                imageUrl="https://qph.cf2.quoracdn.net/main-qimg-937d48385ad5482bea10351df4d7a483"
              />
            </div>
            <div class="col s12 m6 l4 offset-m3 offset-l2">
              <InfoCard
                title="Unique Scenarios"
                description="In adipisicing nisi proident enim tempor excepteur culpa sint quis laborum. Adipisicing nulla deserunt amet ad pariatur ut anim ullamco ipsum deserunt cillum anim. Nisi ullamco voluptate dolor aute est fugiat sunt ex."
                linkText="Our plans"
                linkUrl="#"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ywCXZRbp2Vhke8sy1g77gleM_jOUPFEjdLzuMfrgyg&s"
              />
            </div>
            <div class="col s12 m6 l4">
              <InfoCard
                title="Unforgettable Times"
                description="In adipisicing nisi proident enim tempor excepteur culpa sint quis laborum. Adipisicing nulla deserunt amet ad pariatur ut anim ullamco ipsum deserunt cillum anim. Nisi ullamco voluptate dolor aute est fugiat sunt ex."
                linkText="Client Reviews"
                linkUrl="#"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbbxL2kkcvinhzdHvqNHgg-f5dunSCimRWVlCNzWktHQ&s"
              />
            </div>
          </div>
          <CreateTrip />
        </div>
        <div className="parallax-container" style={{ height: "60vh" }}>
          <div className="parallax">
            <img src="https://breathingtravel.com/wp-content/uploads/2023/07/Komodo-National-Park-in-Indonesia.jpg" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
