import React, { useState, useEffect } from 'react';

const ExerciseDailyRoutine = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [routine, setRoutine] = useState([]);

  // Fetch exercise data
  useEffect(() => {
    fetch('http://localhost:3000/exercises')
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
      })
      .catch((error) => {
        console.error('Error fetching exercises:', error);
      });
  }, []);

  // Function to handle exercise selection
  const handleExerciseSelect = (event) => {
    const selectedExerciseId = parseInt(event.target.value);
    const exerciseToAdd = exercises.find((exercise) => exercise.id === selectedExerciseId);
    if (exerciseToAdd) {
      setRoutine([...routine, exerciseToAdd]);
    }
  };

  const handleRemoveExercise = (exerciseId) => {
    const updatedRoutine = routine.filter((exercise) => exercise.id !== exerciseId);
    setRoutine(updatedRoutine);
  };

  return (
    <div className="container mt-5" style={{ width: "70%" }}>
      <h2 className="text-warning">Daily Routine</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="exerciseSelect" style={{ color: 'green', fontSize: '20px' }}>
              Select an Exercise
            </label>
            <select
              id="exerciseSelect"
              className="form-control"
              onChange={handleExerciseSelect}
              style={{ width: '50%' }}
            >
              <option value="">Select an exercise</option>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <br></br>
          <h3 className="text-primary">Selected Exercises</h3>
          <div className="row">
            {routine.map((exercise) => (
              <div key={exercise.id} className="col-md-4 mb-4">
                <div className="card" style={{ width: '100%' }}>
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{exercise.name}</h5>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveExercise(exercise.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDailyRoutine;