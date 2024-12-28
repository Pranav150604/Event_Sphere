import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { EventCard } from "../components/EventCard";
import { useNavigate } from "react-router-dom";
import { ShowTickets } from "./ShowTickets";

export const OrganizeEvents = () => {
  const [events, setEvents] = useState([]);
  const [eventTicket,setEventTicket] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const usid = decodedToken.uid;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/getOrganizersEvents/${usid}`
        );
        setEvents(res.data.results);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, []);

  const DisplayDay = ({ date, time }) => {
    const dateObj = new Date(date);

    const dayIndex = dateObj.getDay();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[dayIndex];

    return (
      <div className="flex gap-2">
        <p>{dayName}</p> • <p>{time}</p>
      </div>
    );
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="font-outfit">
        <div className="text-center text-3xl mb-2">Manage Your Events</div>
        <div className="grid grid-cols-3 w-[80%]">
          {events.map((eve) => {
            return (
              <div key={eve.eid}>
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
                  <a href="#">
                    <h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                      {eve.title}
                    </h5>
                  </a>
                  <div>{eve.description}</div>
                  <div class="mb-3 font-normal text-gray-700">
                    <DisplayDay date={eve.date} time={eve.time} />
                  </div>
                  <div>{eve.location}</div>
                  <div className="bg-orange-500 w-36 text-center text-white p-1 rounded-md" onClick={(e) => {
                    navigate(`/createTicket/${eve.eid}`)
                  }}>Add Tickets</div>
                  <ShowTickets eid={eve.eid}/> 
                </div>
                            
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
