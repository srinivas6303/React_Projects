import React, { useState } from 'react';
import BusBookingApp from './BusBooking/BusBookingApp';
import MovieBookingApp from './MovieBooking/MovieBookingApp';
import CounterApp from './Counter/CounterApp';
import ToDoListApp from './Todolist/ToDoListApp';
import './NavigatorApp.css';

function NavigatorApp() {
  const [busApp, setBusApp] = useState(false);
  const [movieApp, setMovieApp] = useState(false);
  const [counterApp, setCounterApp] = useState(false);
  const [todolistApp, setToDoListApp] = useState(false);

  function handleApp(app) {
    setBusApp(false);
    setMovieApp(false);
    setCounterApp(false);
    setToDoListApp(false);

    if (app === "bus") setBusApp(true);
    else if (app === "movie") setMovieApp(true);
    else if (app === "counter") setCounterApp(true);
    else if (app === "todo") setToDoListApp(true);
  }

  return (
    <div className="navigator-container">
      <h1 className="title">🚀 My React Projects</h1>

      <div className="button-grid">
        <div className="app-card" onClick={() => handleApp("counter")}>
          <img src="https://images.pexels.com/photos/1329297/pexels-photo-1329297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Counter" />
          <button>Counter App 🧮</button>
        </div>
        <div className="app-card" onClick={() => handleApp("todo")}>
          <img src="https://images.pexels.com/photos/7718755/pexels-photo-7718755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="To Do List" />
          <button>To-Do List 📋</button>
        </div>
        <div className="app-card" onClick={() => handleApp("bus")}>
          <img src="https://images.pexels.com/photos/996954/pexels-photo-996954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Bus Booking" />
          <button>Bus Booking 🚌</button>
        </div>
        <div className="app-card" onClick={() => handleApp("movie")}>
          <img src="https://images.pexels.com/photos/5662857/pexels-photo-5662857.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Movie Booking" />
          <button>Movie Booking 🎬</button>
        </div>
      </div>

      <div className="app-output">
        {counterApp && <CounterApp />}
        {todolistApp && <ToDoListApp />}
        {busApp && <BusBookingApp />}
        {movieApp && <MovieBookingApp />}
      </div>
    </div>
  );
}

export default NavigatorApp;
