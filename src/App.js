import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import NavBar from "./Components/NavBar/NavBar";
import Income from "./Pages/Income";
import Home from "./Pages/Home";
import Expenses from "./Pages/Expenses";
import Savings from "./Pages/Savings";
import Reports from "./Pages/Reports";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/income-management" element={<Income />} />
        <Route path="/expenses-management" element={<Expenses />} />
        <Route path="/savings-management" element={<Savings />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;
