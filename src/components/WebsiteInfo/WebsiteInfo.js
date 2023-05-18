import React from "react";

import profilePicture from "../../images/peter-arthur-profile.jpg";

const WebsiteInfo = () => {
  return (
    <div>
      <div className="center-section">
        <section className="about-background about-me-intro " id="about">
          {" "}
          <div className="center-img">
            <img
              src={profilePicture}
              alt="a picture of Peter Arthur"
              className="intro_img_resize"
            />
          </div>
          <h2 className="center">Peter Arthur</h2>
          <p className="section__subtitle section__subtitle--about center more-space">
            Economics graduate turned React developer
          </p>
          <div className="about-me__body">
            <p>
              Working to grow as a front-end developer and also gain skill at
              core algorithms and data structures.
            </p>
            <p>Other projects can be found on my Github page linked below.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WebsiteInfo;