import "./Card.css";
import PropTypes from "prop-types";

const Card = (props) => {
  const { title, value } = props;
  return (
    <>
      <div className="card">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </>
  );
};

// Card.propTypes = {
//   title: PropTypes.string,
//   value: PropTypes.number || PropTypes.string,
// };

// Card.defaultProps = {
//   title: "Title",
//   value: 0 || '0',
// };

export default Card;
