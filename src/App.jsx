import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="item-container">
          <div className="drop-item">
            <div className="drag-item"></div>
          </div>
          <div className="drop-item">
            <div className="drag-item"></div>
          </div>
          <div className="drop-item">
            <div className="drag-item"></div>
          </div>
        </div>

        <div className="item-container">
          <div className="drop-item"></div>
          <div className="drop-item"></div>
          <div className="drop-item"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
