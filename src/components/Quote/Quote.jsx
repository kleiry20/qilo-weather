import "./Quote.css";
import { useState, useEffect } from "react";
import moment from "moment";

const Quote = () => {
  const [istDateTime, setISTDateTime] = useState({ istDate: "", istTime: "" });
  const [quote, setQuote] = useState({
    quoteText: "",
    quoteAuthor: "",
  });

  // to fetch the qoutes api
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(
          "https://quote-garden.onrender.com/api/v3/quotes/random"
        );
        if (response.ok) {
          const data = await response.json();
          const { quoteText, quoteAuthor } = data.data[0];
          setQuote({
            quoteText,
            quoteAuthor,
          });
        } else {
          throw new Error("Failed to fetch quote");
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);

  // handles the current time and date
  useEffect(() => {
    const { istDate, istTime } = getCurrentISTDateTime();
    setISTDateTime({ istDate, istTime });
  }, []);

  let days_of_week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getCurrentISTDateTime = () => {
    // Fetch the current UTC time
    const utcTime = moment.utc();

    // Convert UTC time to IST time
    const istTime = utcTime.clone().utcOffset("+05:30").format("HH:mm"); // Convert to IST time as "hr:min"

    // Format the IST date (e.g., "Mon, 29 Apr 2024")
    const istDate = utcTime
      .clone()
      .utcOffset("+05:30")
      .format("ddd, D MMM YYYY");

    return { istDate, istTime };
  };

  return (
    <>
      <div className="day-info">
        <div className="day-div">
          <p className="day-text">{istDateTime.istDate}</p>
          <p className="day-text">{istDateTime.istTime}</p>
        </div>

        {quote ? (
          <>
            <blockquote className="qouteText">{`"${quote.quoteText}"`}</blockquote>
            <blockquote className="qouteAuthor">
              <cite>- {quote.quoteAuthor}</cite>
            </blockquote>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Quote;
