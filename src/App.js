import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Tracker from "./pages/Tracker";
import Driver from "./pages/Driver";
import HeaderComponent from "./components/HeaderComponent";
import PackageForm from "./components/PackageForm";
import DeliveryForm from "./components/DeliveryForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container">
      <ToastContainer />
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Admin />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/create-package" element={<PackageForm />} />
          <Route path="/create-delivery" element={<DeliveryForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
