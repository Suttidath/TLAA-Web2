import "./App.css";
import AppLayout from "./layout/appLayout";
import Login from "./layout/login";

function App() {
  const login = sessionStorage.getItem("login");
  console.log(`login value`, login);

  return (
    <div className="app">
      <div>{login ? <AppLayout /> : <Login />}</div>
      {/* <AppLayout /> */}
    </div>
  );
}
export default App;
