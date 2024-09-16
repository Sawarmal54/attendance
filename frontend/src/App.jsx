import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import CreateWorker from "./pages/AddWorker";
import PrivateRoute from "./components/PrivateRoute";
import CreateLocation from "./pages/AddLocation";
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/addworker" element={<CreateWorker />} />
          {/* <Route path="/update-listing/:listingId" element={<UpdateListing />} /> */}
          <Route path="/addlocation" element={<CreateLocation />} />

        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}