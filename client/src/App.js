import WebsiteInfo from "./components/WebsiteInfo/WebsiteInfo";
import Board from "./components/Board/Board";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <div className="flex-website-and-connect-four">
        <div className="connect-four-width">
          <Board />
        </div>
        <div className="intro-width">
          <WebsiteInfo />
        </div>
      </div>
    </div>
  );
}

export default App;
