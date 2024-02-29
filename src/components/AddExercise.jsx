import React, { useState } from 'react';

function AddExercise() {
  const [exerciseData, setExerciseData] = useState({
    name: '',
    image: '',
    description: '',
    likes: 0,
    dislikes: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send a POST request to your JSON server
    fetch('http://localhost:3000/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exerciseData),
    })
    .then((response) => response.json())
    .then((addedExercise) => {
      console.log('Exercise added:', addedExercise);
      
      // Clear the input fields or perform any other actions
      setExerciseData({
        name: '',
        image: '',
        description: '',
        likes: 0,
        dislikes: 0,
      });
    })
    .catch((error) => {
      console.error('Error adding exercise:', error);
    });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-6">
        <h2 className="text-warning">Add Exercise</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              name="name"
              value={exerciseData.name}
              onChange={handleInputChange}
              placeholder="Exercise Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image URL:</label>
            <input
              type="text"
              id="image"
              className="form-control"
              name="image"
              value={exerciseData.image}
              onChange={handleInputChange}
              placeholder="Image URL"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
              id="description"
              className="form-control"
              name="description"
              value={exerciseData.description}
              onChange={handleInputChange}
              placeholder="Exercise Description"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Add Exercise</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExercise;
