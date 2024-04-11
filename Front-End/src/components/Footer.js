import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="page-footer white">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="black-text">Plan Your Trip with Us</h5>
              <p className="black-text text-lighten-4">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean. A small river named Duden flows by their
                place and supplies it with the necessary regelialia. It is a
                paradisematic country, in which roasted parts of sentences fly
                into your mouth. Even the all-powerful Pointing has no control
                about the blind texts it is an almost unorthographic. Italic
                Mountains, she had a last view back on the skyline
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="black-text">Links</h5>
              <ul>
                <li>
                  <a className="black-text text-lighten-3" href="#!">
                    Create Trip
                  </a>
                </li>
                <li>
                  <a className="black-text text-lighten-3" href="#!">
                    My Trips
                  </a>
                </li>
                <li>
                  <a className="black-text text-lighten-3" href="#!">
                    My Profile
                  </a>
                </li>
                <li>
                  <a className="black-text text-lighten-3" href="#!">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright black-text">
          <div className="container black-text">© 2024 Copyright Text</div>
        </div>
      </footer>
    );
  }
}
