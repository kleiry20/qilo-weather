import "./Card.css";
import PropTypes from "prop-types";

const Card = (props) => {
  const { item, currentWeatherData, weeklyData, isWeekly, isDaily } = props;
  //   console.log('item', item)
  return (
    <>
      {isWeekly && (
        <div className="card">
          {/* <h3>{weeklyData.title}</h3> */}
          <p>weekly data</p>
        </div>
      )}

      {isDaily && (
        <div className="card">
          {/* <h3>{currentWeatherData.title}</h3> */}
          <p>daily data</p>
        </div>
      )}
    </>
  );
};

// Card.propTypes = {
//   item: PropTypes.objectOf(
//     PropTypes.shape({
//       title: PropTypes.string,
//     })
//   ),
// };

// Card.defaultProps = {
//   item: {
//     title: "Card Name",
//   },
// };

export default Card;
