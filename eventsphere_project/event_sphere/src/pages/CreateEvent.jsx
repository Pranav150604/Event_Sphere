// src/pages/CreateEvent.js

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setStartDate] = useState("");
  const [time, setStartTime] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      title,
      description,
      location,
      date,
      time,
      category,
    };
    console.log(eventData);
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("Token not found");
      }
      console.log(token)
      const res = await axios.post(
        "http://localhost:3001/events",
        eventData,
        {
          headers: {
            "Authorization": `Bearer ${token.trim()}`,
          },
        }
      );
      console.log(res.data);
      navigate("/organize")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full p-2 border rounded"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="location">
            Location
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Start Date
          </label>
          <input
            className="w-full p-2 border rounded"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="time">
            Start Time
          </label>
          <input
            className="w-full p-2 border rounded"
            type="time"
            id="time"
            value={time}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};
