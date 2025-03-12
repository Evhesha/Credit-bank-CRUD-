import "./App.css";
import Records from "./Blocks/records/Records";
import Bankers from "./Blocks/bankers/Bankers";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Records />
        <Bankers />
      </div>
    </div>
  );
}

export default App;
