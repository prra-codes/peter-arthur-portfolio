// import profilePicture from "./images/peter-arthur-profile.jpg";
// import { FaGithub } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import { IoMdMail } from "react-icons/io";
// import { GoGlobe } from "react-icons/go";
import WebsiteInfo from "./components/WebsiteInfo/WebsiteInfo";
import Board from "./components/Board/Board";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <div className="flex-website-and-connect-four">
        <div className="testing-one intro-width">
          <WebsiteInfo />
        </div>
        <div className="testing-two connect-four-width">
          <Board />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
