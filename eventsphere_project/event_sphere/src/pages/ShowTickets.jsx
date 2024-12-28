import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const ShowTickets = ({eid}) => {
  const [order,setOrder] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/showTickets`,{params: {eid}}
        );
        setOrder(res.data.results);
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
      View tickets
      {order.map((o) => {
        return <div>
          <div className="flex justify-between">
            <div>
              {o.ticket_type}
            </div>
            <div>
              {o.price}
            </div>             
          </div>
          
        </div>
      })}
    </div>
  )
}
