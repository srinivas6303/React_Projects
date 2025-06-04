import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BusBookingApp.css';

function AvailableBuses({ startCity, desCity }) {
    const buses = [
        { id: 1, name: "Express Deluxe", departure: "06:00 AM", arrival: "12:30 PM", type: "AC Sleeper" },
        { id: 2, name: "City Travels", departure: "08:30 AM", arrival: "03:00 PM", type: "Non-AC Chair" },
        { id: 3, name: "Royal Cruiser", departure: "10:15 AM", arrival: "04:45 PM", type: "AC Sleeper" },
        { id: 4, name: "Fast Lane", departure: "02:00 PM", arrival: "08:30 PM", type: "Non-AC Chair" }
    ];

    const [showSeats, setShowSeats] = useState(false);

    return (
        <div className="available-buses">
            <h2>Available Buses from {startCity} to {desCity}</h2>
            <table className="bus-table" border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Bus Name</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {buses.map((bus) => (
                        <tr key={bus.id}>
                            <td>{bus.name}</td>
                            <td>{bus.departure}</td>
                            <td>{bus.arrival}</td>
                            <td>{bus.type}</td>
                            <td><button className="book-btn" onClick={() => setShowSeats(true)}>Book Now</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showSeats && <SeatBooking startCity={startCity} desCity={desCity} />}
        </div>
    );
}

function SeatBooking({ startCity, desCity }) {
    const [chairCount, setChairCount] = useState(0);
    const [SleeperCount, setSleeperCount] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showPayment, setShowPayment] = useState(false);

    const priceChart = {
        "Hyderabad-Guntur": { chair: 300, sleeper: 500 },
        "Hyderabad-Vizag": { chair: 500, sleeper: 800 },
        "Hyderabad-Warangal": { chair: 200, sleeper: 400 },
        "Hyderabad-Karimnagar": { chair: 350, sleeper: 600 },
        "Guntur-Hyderabad": { chair: 300, sleeper: 500 },
        "Guntur-Vizag": { chair: 350, sleeper: 600 },
        "Guntur-Warangal": { chair: 280, sleeper: 500 },
        "Guntur-Karimnagar": { chair: 400, sleeper: 700 },
        "Vizag-Hyderabad": { chair: 500, sleeper: 800 },
        "Vizag-Guntur": { chair: 350, sleeper: 600 },
        "Vizag-Warangal": { chair: 450, sleeper: 750 },
        "Vizag-Karimnagar": { chair: 500, sleeper: 850 },
        "Warangal-Hyderabad": { chair: 200, sleeper: 400 },
        "Warangal-Guntur": { chair: 280, sleeper: 500 },
        "Warangal-Vizag": { chair: 450, sleeper: 750 },
        "Warangal-Karimnagar": { chair: 220, sleeper: 400 },
        "Karimnagar-Hyderabad": { chair: 350, sleeper: 600 },
        "Karimnagar-Guntur": { chair: 400, sleeper: 700 },
        "Karimnagar-Vizag": { chair: 500, sleeper: 850 },
        "Karimnagar-Warangal": { chair: 220, sleeper: 400 },
    };

    const routeKey = `${startCity}-${desCity}`;
    const prices = priceChart[routeKey] || { chair: 0, sleeper: 0 };
    const totalPrice = chairCount * prices.chair + SleeperCount * prices.sleeper;

    const chair = ["A1", "B1", "C1", "D1", "A2", "B2", "C2", "D2"];
    const Sleeper = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

    function handleChair(index) {
        const seat = chair[index];
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
            setChairCount(chairCount - 1);
        } else {
            setSelectedSeats([...selectedSeats, seat]);
            setChairCount(chairCount + 1);
        }
    }

    function handleSleeper(index) {
        const seat = Sleeper[index];
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
            setSleeperCount(SleeperCount - 1);
        } else {
            setSelectedSeats([...selectedSeats, seat]);
            setSleeperCount(SleeperCount + 1);
        }
    }

    return (
        <div className="seat-booking">
  <h1>Seat Booking</h1>

  <div className="chair-seats">
    <h3>Chair Seats (₹{prices.chair} each)</h3>
    <div className="chair-seat-layout">
      {chair.map((seat, index) => (
        <button
          key={seat}
          className={`seat chair ${selectedSeats.includes(seat) ? "selected" : ""}`}
          onClick={() => handleChair(index)}
        >
          {seat}
        </button>
      ))}
    </div>
  </div>

  <div className="sleeper-seats">
    <h3>Sleeper Seats (₹{prices.sleeper} each)</h3>
    <div className="sleeper-seat-layout">
      {Sleeper.map((seat, index) => (
        <button
          key={seat}
          className={`seat sleeper ${selectedSeats.includes(seat) ? "selected" : ""}`}
          onClick={() => handleSleeper(index)}
        >
          {seat}
        </button>
      ))}
    </div>
  </div>

  <div className="price-details">
    <h3>Price Details</h3>
    <h6>Chair Count: {chairCount}</h6>
    <h6>Sleeper Count: {SleeperCount}</h6>
    <h6>Selected Seats: {selectedSeats.join(", ")}</h6>
    <h5>Total Price: ₹{totalPrice}</h5>
  </div>

  <button className="proceed-btn" onClick={() => setShowPayment(true)}>Proceed to Payment</button>

  {showPayment && (chairCount > 0 || SleeperCount > 0) && (
    <Payment chairCount={chairCount} SleeperCount={SleeperCount} selectedSeats={selectedSeats} totalPrice={totalPrice} />
  )}
</div>

    );
}

function FinalOutput({ chairCount, SleeperCount, totalPrice, selectedSeats }) {
  return (
    <div className="final-output">
      <h2 className="success-title">🎉 Booking Confirmed!</h2>
      <p className="success-subtitle">Thank you for booking with BusGo!</p>

      <div className="ticket-details">
        <div>
          <strong>Seats Booked:</strong>{" "}
          <span className="highlight">{selectedSeats.join(", ")}</span>
        </div>
        <div>
          <strong>Chair Seats:</strong> {chairCount}
        </div>
        <div>
          <strong>Sleeper Seats:</strong> {SleeperCount}
        </div>
        <div>
          <strong>Total Paid:</strong>{" "}
          <span className="price">₹{totalPrice}</span>
        </div>
      </div>

      <p className="thank-msg">Wishing you a safe and pleasant journey! 🚌</p>
    </div>
  );
}


function Payment({ totalPrice, chairCount, SleeperCount, selectedSeats }) {
  const [paid, setPaid] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    toast.success("🎉 Ticket Booked Successfully!");
    setPaid(true);
  };

  return (
    <form className="payment-section" onSubmit={handlePayment}>
      <h4>Payment Details</h4>

      <input
        type="number"
        placeholder="Card Number"
        className="payment-input"
        required
      />
      <input
        type="text"
        placeholder="Cardholder Name"
        className="payment-input"
        required
      />
      <input
        type="text"
        placeholder="Expiry MM/YY"
        className="payment-input"
        required
      />
      <input
        type="text"
        placeholder="CVV"
        className="payment-input"
        required
      />

      <button type="submit" className="pay-btn">
        Pay ₹{totalPrice}
      </button>

      {paid && (
        <FinalOutput
          chairCount={chairCount}
          SleeperCount={SleeperCount}
          selectedSeats={selectedSeats}
          totalPrice={totalPrice}
        />
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </form>
  );
}

function BusBookingApp() {
    
    const cities = ["Hyderabad", "Guntur", "Karimnagar", "Vizag", "Warangal"];
    const [startCity, setStartCity] = useState("");
    const [desCity, setdestCity] = useState("");
    const [availableBuses, setAvailableBuses] = useState(false);

    function handleStart(e) {
        setStartCity(e.target.value);
    }

    function handleDestination(e) {
        setdestCity(e.target.value);
    }

    function handleBooking() {
        if (startCity !== desCity) {
            setAvailableBuses(true);
        } else {
            toast.warning("Start and Destination cannot be the same");
        }
    }

    return (
        <div className="booking-container">
            <h1>Bus Booking App</h1>

            <ToastContainer position="top-center" autoClose={3000} />

            <label>From: </label>
            <select value={startCity} onChange={handleStart} className="city-select">
                <option value={''}>Select Start City</option>
                {cities.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                ))}
            </select>
            <br />

            <label>To    : </label>
            <select value={desCity} onChange={handleDestination} className="city-select">
                <option value={''}>Select Destination City</option>
                {cities.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                ))}
            </select>
            <br />

             <label htmlFor="travelDate">Travel Date: </label>
            <input type="date" id="travelDate" name="travelDate" /> <br />


            <button className="go-btn" onClick={handleBooking}>Go</button>
            {availableBuses && <AvailableBuses startCity={startCity} desCity={desCity} />}
        </div>
    );
}

export default BusBookingApp;
