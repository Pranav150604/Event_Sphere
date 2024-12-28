import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const CreateTicket = () => {
  const { eventId } = useParams();
  const [ticket_type, setTicketType] = useState("");
  const [ticket_description, setticketDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantiy] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketData = {
      ticket_type,
      ticket_description,
      price,
      quantity,
    };
    try {
      const res = await axios.post(`http://localhost:3001/events/tickets/${eventId}`,ticketData);
      console.log(res.data);
      navigate(`/organize`)
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="font-outfit">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Create Ticket</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="ticket_type">
              Ticket Type
            </label>
            <input
              className="w-full p-2 border rounded"
              type="ticket_type"
              id="ticket_type"
              value={ticket_type}
              onChange={(e) => setTicketType(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="ticket_description"
            >
              Ticket Description
            </label>
            <textarea
              className="w-full p-2 border rounded"
              id="ticket_description"
              value={ticket_description}
              onChange={(e) => setticketDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="w-full p-2 border rounded"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="w-full p-2 border rounded"
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantiy(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};
