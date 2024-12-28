import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const PlaceOrder = () => {
    const [order_quantity,setQuan] = useState(0)
    const [ticketDetails,setTicketDetails] = useState([]);
    const [loading,setLoading] = useState(false)
    const ticketId = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(
              `http://localhost:3001/placingOrder/${ticketId.ticketId}`
            );
            setTicketDetails(res.data.results);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching ticketDetailss:", error);
          }
        };
        fetchData();
      }, []);
      const placeOrder = async () => {
        setIsModalOpen(true); // Open the modal when "Place Order" is clicked
      };

      const handleConfirm = async () => {
          try {
            const token = localStorage.getItem("jwtToken");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.uid;
            if (!token) {
              throw new Error("Token not found");
            }
            console.log(token)
            const res = await axios.post(
              `http://localhost:3001/order/${ticketId.ticketId}`,
              {userId,order_quantity},
            );
            console.log(res.data);
            setIsModalOpen(false);
          } catch (err) {
            console.log(err);
          }
      }
      const handleClose = () => {
        setIsModalOpen(false); // Close the modal without placing the order
      };

  return (
    <div>
        <NavBar/>
        <div className="flex justify-center text-4xl font-bold font-outfit">Order Details</div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 font-outfit -mt-[50px]">
        {ticketDetails ? (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
            {/* <img src="https://via.placeholder.com/600x400" alt="Event" className="rounded-t-lg mb-4 w-full object-cover h-64"/> */}
            <div className="px-4 py-6">
              <h1 className="text-4xl font-bold mb-2">{ticketDetails.event_title}</h1>
              <p className="text-gray-700 mb-6 text-lg">{ticketDetails.event_description}</p>
              <div className="mb-4 text-lg">
                <p className="text-gray-600">
                  <strong>Date:</strong> {ticketDetails.event_date}
                </p>
                <p className="text-gray-600">
                  <strong>Time:</strong> {ticketDetails.event_time}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {ticketDetails.event_location}
                </p>
              </div>
              <div className='text-xl font-semibold'>
                Your Order Details:
              </div>
              <div className=''>
                Ticket Price: {ticketDetails.price}
              </div>
              <div className=''>
                Ticket Type: {ticketDetails.ticket_type}
              </div>
              <div className='pt-2 flex gap-2'>
                Quantity <input className='w-10 border-2 rounded-md border-black text-center' type='number' onChange={(e) => {
                    setQuan(e.target.value)
                }}></input>
              </div>
              <div>
                Order Summary: 
                <div className='flex justify-between'>
                    <div>
                       {ticketDetails.ticket_type} 
                    </div>
                    <div>
                        Rs. {order_quantity * ticketDetails.price}
                    </div>
                </div>
              </div>
              <div className='flex justify-center mt-5 cursor-pointer' onClick={placeOrder}>
                <div className='bg-orange-500 text-center w-36 p-3 text-white text-lg rounded-lg'>
                Place Order
              </div>
              </div>
              
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>     
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
    
  )
}

const Modal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 font-outfit">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Confirm Payment</h2>
          <p className="mb-4">Are you sure you want to place this order?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
