import profilePicture from "../../images/peter-arthur-profile.jpg";

const WebsiteInfo = () => {
  return (
    <div className="intro">
      <section className="about-me-intro">
        {" "}
        <div className="image-alignment ">
          <img
            src={profilePicture}
            className="image-size"
            alt="a picture of Peter Arthur"
          />
        </div>
        <p className="text-alignment section__subtitle--about text-alignment">
          Peter Arthur
        </p>
        <p className="section__subtitle--about text-alignment more-space">
          Economics graduate turned full stack hacker
        </p>
        <div className="text-alignment">
          <p className="self-text">
            This page is an experiment in real-time application development
            using LLMs. It is an SPA built with React. The backend is built with
            Express. It’s deployed on Heroku. The opponent is{" "}
            <span className="line-through">GPT 4 Code Interpreter</span>{" "}
            <span
              title="I'm still waiting on GPT 4 access"
              className="dotted-line"
            >
              GPT 3.5 Turbo
            </span>
            . I am still waiting for API access to GPT-4. Code Interpreter kicks
            ass. I can’t wait for that to be opened up.{" "}
            <span className="underline">
              <a
                href="https://github.com/prra-codes/peter-arthur-portfolio"
                target="_blank"
                className="portfolio-code-link"
              >
                Check out the code here
              </a>
            </span>
            .
          </p>
        </div>
        <ul className="social-list text-alignment">
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
