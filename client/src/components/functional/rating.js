import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rating= (props) => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(
        <span key={i}>
          {i + 1 <= Math.round(props.rating) ? (
            <FontAwesomeIcon icon="star" color="yellow" size="lg" />
          ) : (
            <FontAwesomeIcon icon="star" color="gray" size="lg"/>
          )}
        </span>
      );
    }
    return arr;
  }

  export default Rating;