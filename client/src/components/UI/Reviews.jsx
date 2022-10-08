import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { postReviewScore } from "../../store/actions";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function Review({ id }) {
  const { user } = useSelector((state) => state);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [review, setReview] = useState({});
  const dispatch = useDispatch();
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleReview = (e) => {
    e.preventDefault();
    dispatch(
      postReviewScore(
        id,
        user.id,
        review.description,
        currentValue,
        user.username
      )
    );
    setReview({});
  };

  return (
    <div style={styles.container}>
      <h2> Publica tu reseña </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
      <textarea
        onChange={(e) => handleChange(e)}
        name="description"
        placeholder="What's your experience?"
        style={styles.textarea}
      />
      <button style={styles.button} onClick={(e) => handleReview(e)}>
        Submit
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default Review;
