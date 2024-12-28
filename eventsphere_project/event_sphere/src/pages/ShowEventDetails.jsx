import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

export const ShowEventDetails = () => {
  const eventId = useParams();
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/geteventDetail/${eventId.eid}`
        );
        setEvent(res.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/geteventTickets/${eventId.eid}`
        );
        setTickets(res.data.results);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  });
  if (loading) {
    return (
      <div>
        <NavBar />
        Loading...
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <div className="flex justify-center text-4xl font-bold font-outfit">Event Details</div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 font-outfit -mt-[50px]">
        {event ? (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
            {/* <img src="https://via.placeholder.com/600x400" alt="Event" className="rounded-t-lg mb-4 w-full object-cover h-64"/> */}
            <div className="px-4 py-6">
              <h1 className="text-3xl font-bold mb-2">{event[0].title}</h1>
              <p className="text-gray-700 mb-6">{event[0].description}</p>
              <div className="mb-4">
                <p className="text-gray-600">
                  <strong>Date:</strong> {event[0].date}
                </p>
                <p className="text-gray-600">
                  <strong>Time:</strong> {event[0].time}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {event[0].location}
                </p>
              </div>
              <div>
                <div className="text-xl border-b-2 w-16 border-black">Tickets</div>
                {tickets ? (
                  <div className="flex flex-col">
                    {tickets.map((tic) => {
                      return (
                        <div className="flex flex-col gap-3">
                          <div className="font-semibold">{tic.ticket_type}</div>
                          <div>{tic.ticket_description}</div>
                          <div className="font-semibold">Rs.{tic.price}</div>
                          <div className="">Ticets Remaining {tic.quantity}</div>
                          <div className="bg-orange-500 w-32 text-center text-white rounded-md cursor-pointer" onClick={(e) => {
                              navigate(`/placeOrder/${tic.tid}`)
                          }}>Order Tickets</div>
                          <div className=" border-b-2 border-black"></div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
