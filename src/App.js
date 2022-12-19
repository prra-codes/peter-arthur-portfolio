import profilePicture from "./images/peter-arthur-profile.jpg";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { GoGlobe } from "react-icons/go";

function App() {
  return (
    <div>
      <div className="dark-background">
        <div className="max-width-870 margin-auto">
          <nav>
            <ul className="nav_list">
              <li className="nav_item">
                <a href="#about">About</a>
              </li>
              <li className="nav_item">
                <a href="#projects">Projects</a>
              </li>
              <li className="nav_item">
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Introduction */}

      <section className="intro section-intro">
        <h1 className="section__title section__title--intro">
          Hi, I am <strong>Peter Arthur</strong>
        </h1>
        <p className="section__subtitle section__subtitle--intro">
          front-end dev
        </p>
        <img
          src={profilePicture}
          alt="a picture of Peter Arthur"
          className="intro__img"
        />
      </section>

      {/* About me */}

      <div className="center-section">
        <section
          className="about-background about-me-intro max-width-870"
          id="about"
        >
          <h2 className="center">Who I am</h2>
          <p className="section__subtitle section__subtitle--about center more-space">
            Economics graduate turned React developer
          </p>
          <div className="about-me__body">
            <p>
              Working to grow as a front-end developer and also gain skill at
              core algorithms and data structures.
            </p>
          </div>
        </section>
      </div>

      {/* My services */}

      <section className="my-services">
        <div className="services">
          <div className="service">
            <h3 className="secondary-title text-align-start">Tech</h3>
            <p>
              HTML, CSS, JavaScript, React. I have built various React
              applications including those within my portfolio.
            </p>
          </div>{" "}
          <div className="service">
            <h3 className="secondary-title  text-align-start">Interests</h3>
            <p>
              My interests include reading books and learning new things, going
              to the gym, and playing sports.{" "}
            </p>
          </div>{" "}
          <div className="service">
            <h3 className="secondary-title  text-align-start">Upcoming</h3>

            <p>
              As I learn and improve my skills, this portfolio will be updated.
              Keep a look out for new projects!{" "}
            </p>
          </div>{" "}
        </div>{" "}
      </section>

      {/* My Work */}

      <section className="my-work my-projects-section" id="projects">
        <h2 className="section__title section__title--work">Projects</h2>
        <p className="section__subtitle section__subtitle--work">
          All projects built with React and CSS, deployed with Github pages
        </p>
        <div className="portfolio">
          <div className="portfolio-item">
            <h3 className="secondary-title-intro">Pokédex</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://prra-codes.github.io/pokedex/"
                  className="site"
                  target="_blank"
                >
                  Visit Site
                  <div>
                    <GoGlobe />
                  </div>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://github.com/prra-codes/pokedex.git"
                  className="site"
                  target="_blank"
                >
                  Github
                  <div>
                    <FaGithub />
                  </div>
                </a>
              </li>
            </ul>
            <div className="center-section">
              <p className="text-align-start max-width-section">
                A Pokédex app! I've been a Pokémon fan for a very long time, so
                I thought it would be fun to create a pokedex. This app uses the
                Pokémon API to gather data about the pokemon and display it
                within the app.
              </p>
            </div>
          </div>
          <div className="portfolio-item">
            <h3 className="secondary-title-intro">Palindrome Prime</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://prra-codes.github.io/palindrome-prime/"
                  className="site"
                  target="_blank"
                >
                  Visit Site
                  <div>
                    <GoGlobe />
                  </div>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://github.com/prra-codes/palindrome-prime.git"
                  className="site"
                  target="_blank"
                >
                  Github
                  <div>
                    <FaGithub />
                  </div>
                </a>
              </li>
            </ul>
            <div className="center-section">
              <p className="text-align-start max-width-section">
                This is a app I created that tests for a range of numbers, to
                examine if they are both a Prime Number (a number that is
                divisible by itself and 1) and a Palindrome (a phrase or
                sequence that reads the same backwards as forwards).
              </p>
            </div>
          </div>
          <div className="portfolio-item">
            <h3 className="secondary-title-intro">Speed Typing Game</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://prra-codes.github.io/speed-typing-game/"
                  className="site"
                  target="_blank"
                >
                  Visit Site
                  <div>
                    <GoGlobe />
                  </div>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://github.com/prra-codes/speed-typing-game.git"
                  className="site"
                  target="_blank"
                >
                  Github
                  <div>
                    <FaGithub />
                  </div>
                </a>
              </li>
            </ul>
            <div className="center-section">
              <p className="text-align-start max-width-section">
                This app checks how many words someone can type within 15
                seconds. A user can play as much as they like and try to beat
                their record!
              </p>
            </div>
          </div>
          <div className="portfolio-item">
            <h3 className="secondary-title-intro">Tenzies</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://prra-codes.github.io/tenzies/"
                  className="site"
                  target="_blank"
                >
                  Visit Site
                  <div>
                    <GoGlobe />
                  </div>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://github.com/prra-codes/tenzies.git"
                  className="site"
                  target="_blank"
                >
                  Github
                  <div>
                    <FaGithub />
                  </div>
                </a>
              </li>
            </ul>
            <div className="center-section">
              <p className="text-align-start max-width-section">
                This is a Tenzies game I created using React. A user can press
                the roll button to generate dice rolls and click the number
                cards to freeze the numbers until they reach Tenzies!
              </p>
            </div>
          </div>
          <div className="portfolio-item">
            <h3 className="secondary-title-intro">Meme Generator</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://prra-codes.github.io/meme-generator/"
                  className="site"
                  target="_blank"
                >
                  Visit Site
                  <div>
                    <GoGlobe />
                  </div>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://github.com/prra-codes/meme-generator.git"
                  className="site"
                  target="_blank"
                >
                  Github
                  <div>
                    <FaGithub />
                  </div>
                </a>
              </li>
            </ul>

            <div className="center-section">
              <p className="text-align-start max-width-section">
                Memes are everywhere on the internet, so I knew it would be
                interesting to build a Meme Generator. A user can type in the
                text boxes and generate a random meme by clicking on the button.
              </p>
            </div>
          </div>
          <div>
            <h3 className="secondary-title-intro">Travel Journal</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://prra-codes.github.io/travel-journal/"
                  className="site"
                  target="_blank"
                >
                  Visit Site
                  <div>
                    <GoGlobe />
                  </div>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://github.com/prra-codes/travel-journal.git"
                  className="site"
                  target="_blank"
                >
                  Github
                  <div>
                    <FaGithub />
                  </div>
                </a>
              </li>
            </ul>

            <div className="center-section">
              <p className="text-align-start max-width-section">
                Here is a travel journal app I created, which shows some of my
                travels abroad! It currently shows some details about my trip to
                Japan in the year 2018.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*Footer*/}

      <footer className="footer" id="contact">
        <p className="footer-title">CONTACT</p>

        <a href="mailto:prra@prra.codes" className="footer__link">
          {" "}
          prra@prra.codes
        </a>

        <ul className="social-list">
          <li className="social-list__item">
            <a
              className="social-list__link"
              href="https://github.com/prra-codes"
              target="_blank"
            >
              <FaGithub />
            </a>
          </li>
          <li className="social-list__item">
            <a className="social-list__link" href="mailto:prra@prra.codes">
              <IoMdMail />
            </a>
          </li>
          <li className="social-list__item">
            <a
              className="social-list__link"
              href="https://www.linkedin.com/in/peter-arthur/"
              target="_blank"
            >
              <FaLinkedin />
            </a>
          </li>
        </ul>
      </footer>
      {/* </div> */}
    </div>
  );
}

export default App;
