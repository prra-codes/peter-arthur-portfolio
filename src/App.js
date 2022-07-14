import myProfilePicture from "./images/peter-profile-picture.jpg";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { GoGlobe } from "react-icons/go";

function App() {
  return (
    <div>
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

      {/* Introduction */}

      <section className="intro section-intro">
        <h1 className="section__title section__title--intro">
          Hi, I am <strong>Peter Arthur</strong>
        </h1>
        <p className="section__subtitle section__subtitle--intro">
          front-end dev
        </p>
        <img
          src={myProfilePicture}
          alt="a picture of Peter Arthur"
          className="intro__img"
        />
      </section>

      {/* About me */}

      <section className="about-background about-me-intro" id="about">
        <h2 className="center">Who I am</h2>
        <p className="section__subtitle section__subtitle--about center more-space">
          Developer based out of London
        </p>
        <div className="about-me__body">
          <p>
            An ambitious and driven individual willing to learn and apply new
            processes and procedures. Passionate about technology. Energetic and
            enthusiastic, brightening up the atmosphere. A team player always
            willing to improve.
          </p>
        </div>
      </section>

      {/* My services */}

      <section className="my-services">
        <div className="services">
          <div className="service">
            <h3 className="secondary-title">Tech</h3>
            <p>
              HTML, CSS, JavaScript, React. I have build various React
              applications including those within my portfolio.
            </p>
          </div>{" "}
          <div className="service">
            <h3 className="secondary-title">Interests</h3>
            <p>
              My interests include reading books and learning new things, going
              to the gym, and playing sports.{" "}
            </p>
          </div>{" "}
          <div className="service">
            <h3 className="secondary-title">Upcoming</h3>

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
          A selection of my range of projects
        </p>
        <div className="portfolio">
          <div className="portfolio-item">
            <h3 className="secondary-title">Pokédex</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://peter-135.github.io/pokedex/"
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
                  href="https://github.com/Peter-135/pokedex.git"
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
            <p>
              A Pokédex app! I've been a Pokémon fan for a very long time, so I
              thought it would be fun to create a pokedex. This app uses the
              Pokémon API to gather data about the pokemon and display it within
              the app.
            </p>
            <p>Tech: React and CSS</p>
          </div>
          <div className="portfolio-item">
            <h3 className="secondary-title">Palindrome Prime</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://peter-135.github.io/palindrome-prime/"
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
                  href="https://github.com/Peter-135/palindrome-prime.git"
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

            <p>
              This is a app I created that tests for a range of numbers, to
              examine if they are both a Prime Number (a number that is
              divisible by itself and 1) and a Palindrome (a phrase or sequence
              that reads the same backwards as forwards).
            </p>
            <p>Tech: React and CSS</p>
          </div>
          <div className="portfolio-item">
            <h3 className="secondary-title">Speed Typing Game</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://peter-135.github.io/speed-typing-game/"
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
                  href="https://github.com/Peter-135/speed-typing-game.git"
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
            <p>
              This app checks how many words someone can type within 15 seconds.
              A user can play as much as they like and try to beat their record!
            </p>
            <p>Tech: React and CSS</p>
          </div>
          <div className="portfolio-item">
            <h3 className="secondary-title">Tenzies</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://peter-135.github.io/tenzies/"
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
                  href="https://github.com/Peter-135/tenzies.git"
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

            <p>
              This is a Tenzies game I created using React. A user can press the
              roll button to generate dice rolls and click the number cards to
              freeze the numbers until they reach Tenzies!
            </p>

            <p>Tech: React and CSS</p>
          </div>
          <div className="portfolio-item">
            <h3 className="secondary-title">Meme Generator</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://peter-135.github.io/meme-generator/"
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
                  href="https://github.com/Peter-135/meme-generator.git"
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

            <p>
              Memes are everywhere on the internet, so I knew it would be
              interesting to build a Meme Generator . A user can type in the
              text boxes and generate a random meme by clicking on the button.
            </p>

            <p>Tech: React and CSS</p>
          </div>
          <div>
            <h3 className="secondary-title">Travel Journal</h3>
            <ul className="site-and-github">
              <li className="nav_item">
                <a
                  href="https://peter-135.github.io/travel-journal/"
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
                  href="https://github.com/Peter-135/travel-journal.git"
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

            <p>
              Here is a travel journal app I created, which shows some of my
              travels abroad!
            </p>
            <p>Tech: React and CSS</p>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="footer" id="contact">
        <p className="footer-title">CONTACT</p>
        <a href="mailto:peter.arth5@gmail.com" className="footer__link">
          {" "}
          peter.arth5@gmail.com
        </a>

        <ul className="social-list">
          <li className="social-list__item">
            <a
              className="social-list__link"
              href="https://github.com/Peter-135"
              target="_blank"
            >
              <FaGithub />
            </a>
          </li>
          <li className="social-list__item">
            <a
              className="social-list__link"
              href="mailto:peter.arth5@gmail.com"
            >
              <IoMdMail />
            </a>
          </li>
          <li className="social-list__item">
            <a
              className="social-list__link"
              href="https://www.linkedin.com/in/peter-arthur-9964a323a"
              target="_blank"
            >
              <FaLinkedin />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
