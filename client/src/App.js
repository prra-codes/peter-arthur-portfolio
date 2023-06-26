import WebsiteInfo from "./components/WebsiteInfo/WebsiteInfo";
import Board from "./components/Board/Board";

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
