import "./App.css";
import Records from "./records/Records";
import Bankers from "./bankers/Bankers";

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
