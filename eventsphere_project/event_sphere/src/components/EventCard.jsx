import React from "react";

export const EventCard = ({title,description,date,time,location,category}) => {

    const DisplayDay = ({ date,time}) => {
        const dateObj = new Date(date);
        
        const dayIndex = dateObj.getDay();
      
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
        const dayName = days[dayIndex];
      
        return (
          <div className="flex gap-2">
            <p>{dayName}</p> • <p>{time}</p>
          </div>
        );
      };

  return (
    <div className="font-outfit">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {title}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700">
            <DisplayDay date={date} time={time}/>
        </p>
        <div>
            {location}
        </div>
      </div>
    </div>
  );
};