import profilePicture from "../../images/peter-arthur-profile.jpg";

const WebsiteInfo = () => {
  return (
    <div className="intro">
      <section className="about-me-intro">
        {" "}
        <div className="center-img">
          <img src={profilePicture} alt="a picture of Peter Arthur" />
        </div>
        <h2 className="center">Peter Arthur</h2>
        <p className="section__subtitle--about center more-space">
          Economics graduate turned React developer
        </p>
        <div className="self-description">
          <p>
            Working to grow as a front-end developer and also gain skill at core
            algorithms and data structures.
          </p>
          <p>Other projects can be found on my Github page linked below.</p>
        </div>
      </section>
    </div>
  );
};

export default WebsiteInfo;
