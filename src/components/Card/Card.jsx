import "./Card.css";
import PropTypes from "prop-types";

const Card = (props) => {
  const { item } = props;
  return (
    <div className="card">
      <h3>{item.title}</h3>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ),
};

Card.defaultProps = {
  item: {
    title: "Card Name",
  },
};

export default Card;
