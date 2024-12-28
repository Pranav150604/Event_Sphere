import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

export const ViewTickets = () => {

  const [tickets,setTickets] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const uid = decodedToken.uid;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/userTickets`,{params: {uid}}
        );
        setTickets(res.data.results);
        console.log(res.data.results)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar/>
      <div>
          {tickets.map((ti) => {
            return <div>
              Order id: {ti.oid} || Order Quantity: {ti.order_quantity} || Order Amount: {ti.total_price}

            </div>
          })}
      </div>
    </div>
  )
}
