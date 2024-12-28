import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { CreateEvent } from "./pages/CreateEvent";
import { CreateTicket } from "./pages/CreateTicket";
import { OrganizeEvents } from "./pages/OrganizeEvents";
import { ShowEventDetails } from "./pages/ShowEventDetails";
import { PlaceOrder } from "./pages/PlaceOrder";
import { ViewTickets } from "./pages/ViewTickets";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/userTickets" element={<ViewTickets />} />
          <Route path="/organize" element={<OrganizeEvents />} />
          <Route path="/eventDetails/:eid" element={<ShowEventDetails />} />
          <Route path="/createTicket/:eventId" element={<CreateTicket />} />
          <Route path="/placeOrder/:ticketId" element={<PlaceOrder />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
