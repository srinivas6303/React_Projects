import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MovieBookingApp.css"; 

function FinalOutput({
  movie,
  city,
  showTime,
  date,
  platinumCount,
  goldCount,
  silverCount,
  selectedSeats,
  totalCost,
  selectedTheater,
  selectedLocation,
}) {
  return (
    <div className="final-output">
      <h2>🎫 Booking Summary</h2>
      <p>
        <strong>🎬 Movie:</strong> {movie || "N/A"}
      </p>
      <p>
        <strong>🏛️ Theater:</strong> {selectedTheater || "N/A"}
      </p>
      <p>
        <strong>📍 Location:</strong> {selectedLocation || "N/A"}
      </p>
      <p>
        <strong>🕒 Show Time:</strong> {showTime}
      </p>
      <p>
        <strong>📅 Date:</strong> {date || "N/A"}
      </p>

      <div className="seat-summary">
        <h3>🪑 Seat Counts</h3>
        
          <p>Platinum: {platinumCount}, 
          Gold: {goldCount}, 
          Silver: {silverCount} </p>
        
      </div>

      <p>
        <strong>🎟️ Selected Seats:</strong>{" "}
        {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
      </p>

      <div className="total-cost">
        <h3>💰 Total Cost: ₹{totalCost}</h3>
      </div>
    </div>
  );
}

function Payment({
  city,
  movie,
  showTime,
  date,
  platinumCount,
  goldCount,
  silverCount,
  selectedSeats,
  totalCost,
  selectedTheater,
  selectedLocation,
}) {
  const [showFinalOutput, setFinalOutput] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setFinalOutput(true);
    toast.success("Payment Completed!");
  }

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name on Card:
            <input type="text" name="name" required placeholder="John Doe" />
          </label>
        </div>

        <div className="form-group">
          <label>
            Card Number:
            <input
              type="text"
              name="cardNumber"
              required
              placeholder="1234 5678 9012 3456"
              maxLength={16}
            />
          </label>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Expiry Date:
              <input type="month" name="expiry" required />
            </label>
          </div>

          <div className="form-group">
            <label>
              CVV:
              <input
                type="password"
                name="cvv"
                required
                maxLength={4}
                placeholder="123"
              />
            </label>
          </div>
        </div>

        <button className="button-primary" type="submit">
          Submit Payment
        </button>
      </form>

      {showFinalOutput && (
        <FinalOutput
          city={city}
          movie={movie}
          date={date}
          platinumCount={platinumCount}
          goldCount={goldCount}
          silverCount={silverCount}
          selectedSeats={selectedSeats}
          totalCost={totalCost}
          selectedTheater={selectedTheater}
          selectedLocation={selectedLocation}
          showTime={showTime}
        />
      )}
      <ToastContainer position="top-center" />
    </div>
  );
}


function Seats({
  city,
  movie,
  date,
  selectedTheater,
  selectedLocation,
  showTime,
}) {
  const Platinum = Array.from({ length: 39 }, (_, i) => `P${i + 1}`);
  const Gold = Array.from({ length: 39 }, (_, i) => `G${i + 1}`);
  const Silver = Array.from({ length: 39 }, (_, i) => `S${i + 1}`);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const bookedSeats = ["P3", "P5", "P8", "G5", "G1", "G2", "S9", "S10"];
  const [platinumCount, setPlatinumCount] = useState(0);
  const [goldCount, setGoldCount] = useState(0);
  const [silverCount, setSilverCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [showPayment, setshowPayment] = useState(false);

  function handleCost(seat) {
    const isSelected = selectedSeats.includes(seat);
    const isBooked = bookedSeats.includes(seat);
    if (isBooked) return;

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      if (Platinum.includes(seat)) {
        setPlatinumCount(platinumCount - 1);
        setTotalCost(totalCost - 500);
      } else if (Gold.includes(seat)) {
        setGoldCount(goldCount - 1);
        setTotalCost(totalCost - 250);
      } else if (Silver.includes(seat)) {
        setSilverCount(silverCount - 1);
        setTotalCost(totalCost - 100);
      }
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      if (Platinum.includes(seat)) {
        setPlatinumCount(platinumCount + 1);
        setTotalCost(totalCost + 500);
      } else if (Gold.includes(seat)) {
        setGoldCount(goldCount + 1);
        setTotalCost(totalCost + 250);
      } else if (Silver.includes(seat)) {
        setSilverCount(silverCount + 1);
        setTotalCost(totalCost + 100);
      }
    }
  }

  return (
    <div className="seats-container">
      <div className="screen">SCREEN</div>

      {/* Silver Section */}
      <div className="seat-category">
        <h3>Silver - ₹100/-</h3>
        <div className="seat-wrapper">
          <div className="seat-row">
            {Silver.slice(0, 22).map((seat) => (
              <button
                key={seat}
                className={`seat-button ${selectedSeats.includes(seat) ? "selected" : ""} ${bookedSeats.includes(seat) ? "booked" : ""}`}
                onClick={() => handleCost(seat)}
                disabled={bookedSeats.includes(seat)}
              >
                {seat}
              </button>
            ))}
            <div className="aisle" />
            {Silver.slice(22).map((seat) => (
              <button
                key={seat}
                className={`seat-button ${selectedSeats.includes(seat) ? "selected" : ""} ${bookedSeats.includes(seat) ? "booked" : ""}`}
                onClick={() => handleCost(seat)}
                disabled={bookedSeats.includes(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gold Section */}
      <div className="seat-category">
        <h3>Gold - ₹250/-</h3>
        <div className="seat-wrapper">
          <div className="seat-row">
            {Gold.slice(0, 22).map((seat) => (
              <button
                key={seat}
                className={`seat-button ${selectedSeats.includes(seat) ? "selected" : ""} ${bookedSeats.includes(seat) ? "booked" : ""}`}
                onClick={() => handleCost(seat)}
                disabled={bookedSeats.includes(seat)}
              >
                {seat}
              </button>
            ))}
            <div className="aisle" />
            {Gold.slice(22).map((seat) => (
              <button
                key={seat}
                className={`seat-button ${selectedSeats.includes(seat) ? "selected" : ""} ${bookedSeats.includes(seat) ? "booked" : ""}`}
                onClick={() => handleCost(seat)}
                disabled={bookedSeats.includes(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Platinum Section */}
      <div className="seat-category">
        <h3>Platinum - ₹500/-</h3>
        <div className="seat-wrapper">
          <div className="seat-row">
            {Platinum.slice(0, 22).map((seat) => (
              <button
                key={seat}
                className={`seat-button ${selectedSeats.includes(seat) ? "selected" : ""} ${bookedSeats.includes(seat) ? "booked" : ""}`}
                onClick={() => handleCost(seat)}
                disabled={bookedSeats.includes(seat)}
              >
                {seat}
              </button>
            ))}
            <div className="aisle" />
            {Platinum.slice(22).map((seat) => (
              <button
                key={seat}
                className={`seat-button ${selectedSeats.includes(seat) ? "selected" : ""} ${bookedSeats.includes(seat) ? "booked" : ""}`}
                onClick={() => handleCost(seat)}
                disabled={bookedSeats.includes(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price and Actions */}
      <div className="price-details">
        <h2>Price Details</h2>
        <div className="price-row">
          <span>Platinum Count:</span>
          <span>{platinumCount} × ₹500 = ₹{platinumCount * 500}</span>
        </div>
        <div className="price-row">
          <span>Gold Count:</span>
          <span>{goldCount} × ₹250 = ₹{goldCount * 250}</span>
        </div>
        <div className="price-row">
          <span>Silver Count:</span>
          <span>{silverCount} × ₹100 = ₹{silverCount * 100}</span>
        </div>
        <div className="price-row total">
          <span>Total Cost:</span>
          <span>₹{totalCost}</span>
        </div>
        <p className="selected-seats">
          <strong>Selected Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
        </p>
      </div>

      <div className="action-buttons">
        <button
          className="button-primary proceed-button"
          onClick={() => setshowPayment(true)}
          disabled={!(platinumCount > 0 || goldCount > 0 || silverCount > 0)}
        >
          Proceed to Payment
        </button>
      </div>

      {showPayment && (
        <Payment
          city={city}
          date={date}
          movie={movie}
          platinumCount={platinumCount}
          goldCount={goldCount}
          silverCount={silverCount}
          selectedSeats={selectedSeats}
          totalCost={totalCost}
          selectedTheater={selectedTheater}
          selectedLocation={selectedLocation}
          showTime={showTime}
        />
      )}
    </div>
  );
}


function AvailableTheaters({ city, movie, date }) {
  const theaters = [
    { name: "Sree Laxmi Kala Mandir", location: "Alwal" },
    { name: "GSM Mall", location: "Lingampalli" },
    { name: "AAA Cinema", location: "Ameerpet" },
    { name: "Sudharshan", location: "RTC X Road" },
  ];

  const [showSeats, setShowSeats] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showTime, setShowTime] = useState("");

  function handleTimeClick(theater, time) {
    setShowTime(time);

    const presentTime = new Date()
      .toLocaleTimeString("en-US", { hour12: false })
      .slice(0, 5);
    const presentDate = new Date().toISOString().split("T")[0];

    function convertTo24Hour(t) {
      const [timePart, meridian] = [t.slice(0, 5), t.slice(5)];
      let [hh, mm] = timePart.split(":").map(Number);
      if (meridian === "PM" && hh !== 12) hh += 12;
      if (meridian === "AM" && hh === 12) hh = 0;
      return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
    }

    const selectedTime24 = convertTo24Hour(time);

    if (date > presentDate || (date === presentDate && selectedTime24 > presentTime)) {
      setSelectedTheater(theater.name);
      setSelectedLocation(theater.location);
      setShowSeats(true);
    } else {
      toast.warning("Selected show time is in the past.");
    }
  }

  return (
    <div className="theaters-container">
      <h1>
        Available theaters for {movie} at {city} on {date}
      </h1>
      <div className="theaters-table-container">
        <table className="theaters-table" cellPadding="10" border="1">
          <thead>
            <tr>
              <th>Theater Name</th>
              <th>Location</th>
              <th>Morning Show</th>
              <th>Matinee</th>
              <th>Evening Show</th>
            </tr>
          </thead>
          <tbody>
            {theaters.map((theater, index) => (
              <tr key={index}>
                <td>{theater.name}</td>
                <td>{theater.location}</td>
                <td>
                  <button
                    className="showtime-button"
                    onClick={() => handleTimeClick(theater, "11:30AM")}
                  >
                    11:30AM
                  </button>
                </td>
                <td>
                  <button
                    className="showtime-button"
                    onClick={() => handleTimeClick(theater, "2:00PM")}
                  >
                    2:00PM
                  </button>
                </td>
                <td>
                  <button
                    className="showtime-button"
                    onClick={() => handleTimeClick(theater, "10:30PM")}
                  >
                    10:30PM
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSeats && (
        <Seats
          city={city}
          movie={movie}
          date={date}
          selectedTheater={selectedTheater}
          selectedLocation={selectedLocation}
          showTime={showTime}
        />
      )}
    </div>
  );
}

function MovieBookingApp() {
  const movies = ["RRR", "KGF", "KGF-3", "RETRO", "SALAR", "DARLING"];
  const Cities = ["Hyderabad", "Warangal", "Sangareddy", "Karimnagar", "Zaheerabad"];

  const [city, setCity] = useState("");
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");
  const [showTheaters, setShowTheaters] = useState(false);

  const presentDate = new Date().toISOString().split("T")[0];

  function handleCity(e) {
    setCity(e.target.value);
  }

  function handleMovie(e) {
    setMovie(e.target.value);
  }

  function handleDate(e) {
    setDate(e.target.value);
  }

  function handleCheck() {
    if (!movie || !city || !date) {
      toast.warning("Please select all fields.");
      return;
    }

    if (date < presentDate) {
      toast.warning("Date should be greater than or equal to the present date.");
      return;
    }

    setShowTheaters(true);
  }

  return (
    <div className="movie-booking-app">
      <header className="app-header">
        <h1>🎬 Movie Booking App</h1>
      </header>

      <div className="booking-form">
        <div className="select-container">
          <label>Movie Name: </label>
          <select value={movie} onChange={handleMovie}>
            <option value="">Select Movie Name</option>
            {movies.map((movie, index) => (
              <option key={index} value={movie}>
                {movie}
              </option>
            ))}
          </select>
        </div>

        <div className="select-container">
          <label>City Name: </label>
          <select value={city} onChange={handleCity}>
            <option value="">Select your City</option>
            {Cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="select-container">
          <label>Select Date: </label>
          <input type="date" value={date} onChange={handleDate} min={presentDate} />
        </div>

        <div className="action-buttons">
          <button className="button-primary" onClick={handleCheck}>
            Check Availability
          </button>
        </div>
      </div>

      <ToastContainer position="top-center" />

      {showTheaters && <AvailableTheaters city={city} movie={movie} date={date} />}
    </div>
  );
}

export default MovieBookingApp;
