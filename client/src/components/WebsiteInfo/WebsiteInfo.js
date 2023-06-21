import profilePicture from "../../images/peter-arthur-profile.jpg";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

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
          <p className="">
            Working to grow as a front-end developer and also gain skill at core
            algorithms and data structures.
          </p>
        </div>
        <ul className="social-list">
          <li>
            <a href="mailto:prra@prra.codes" className="footer__link">
              {" "}
              prra@prra.codes
            </a>
          </li>
          <li>
            <a href="https://github.com/prra-codes" target="_blank">
              Github
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/peter-arthur/" target="_blank">
              LinkedIn
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default WebsiteInfo;
