import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rating= ({rating,size}) => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(
        <span key={i}>
          {i + 1 <= Math.round(rating) ? (
            <FontAwesomeIcon icon="star" color="yellow" size={`${size}`} />
          ) : (
            <FontAwesomeIcon icon="star" color="gray" size={`${size}`}/>
          )}
        </span>
      );
    }
    return arr;
  }

  export default Rating;