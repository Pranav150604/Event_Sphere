import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { EventCard } from "../components/EventCard";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [events, setEvents] = useState([]);
  const [email,setEmail] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/get_events");
        setEvents(res.data.results);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <NavBar username={email}/>
      </div>
      <img src="https://cdn.evbstatic.com/s3-build/fe/build/images/1329d3fa0bbfbc6afebbf10bfaa6a09a-1_web_1919x543.webp"/>
      <div className="text-center font-outfit text-3xl font-bold mt-2">Check out Latest Events: </div>
      <div className="flex justify-center mt-[20px]">
        <div className="grid grid-cols-3 w-[80%] gap-5">
          {events.map((eve) => {
            return (
              <div onClick={() => {
                navigate(`/eventDetails/${eve.eid}`)
              }}>
                <EventCard title={eve.title} date={eve.date} time={eve.time} location={eve.location}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
