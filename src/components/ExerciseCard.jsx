import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ExerciseCard = ({ exercise, onLike, onDislike }) => {
  const [likes, setLikes] = useState(exercise.likes);
  const [dislikes, setDislikes] = useState(exercise.dislikes);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1); 
    onLike(exercise.id, likes + 1);
  };

  const handleDislike = () => {
    setDislikes((prevDislikes) => prevDislikes + 1); 
    onDislike(exercise.id, dislikes + 1);
  };

  return (
    <div className="col-md-2 mb-3">
      <div className="card">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="card-img-top"
          style={{ height: '150px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{exercise.name}</h5>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary me-2" onClick={handleLike}>
            <span role="img" aria-label="Like">👍 </span> {likes}
          </button>
          <button className="btn btn-danger me-2" onClick={handleDislike}>
            <span role="img" aria-label="Dislike">👎 </span> {dislikes}        
          </button>
        </div>
        <div className='container'>
        <Link to={`/exercise-details/${exercise.id}`} className='btn btn-secondary me-2 text-small'>
            View Details
          </Link>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default ExerciseCard;
