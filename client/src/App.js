import './App.css';

function App() {

  console.log(process.env.REACT_APP_APPWRITE_URL)
  return (
    <div className="App">
      <h1>Serverless React App</h1>
    </div>
  );
}

export default App;