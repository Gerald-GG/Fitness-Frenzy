import React, { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';

const ExerciseDisplay = ({ searchTerm }) => {
  // State to hold the list of all exercises
  const [exercises, setExercises] = useState([]);

  // State to hold the filtered exercises
  const [filteredExercises, setFilteredExercises] = useState([]);

  // Function to fetch exercises from the server
  const fetchExercises = () => {
    fetch('http://localhost:3000/exercises')
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
      })
      .catch((error) => {
        console.error('Error fetching exercises:', error);
      });
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    // Filter the exercises based on the searchTerm
    if (searchTerm) {
      const filtered = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExercises(filtered);
    } else {
      setFilteredExercises(exercises);
    }
  }, [searchTerm, exercises]);

  const handleLike = (exerciseId, updatedLike) => {
    fetch(`http://localhost:3000/exercises/${exerciseId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: updatedLike }),
    })
      .then((response) => {
        if (response.ok) {
          const updatedExercise = filteredExercises.map((exercise) => {
            if (exercise.id === exerciseId) {
              return { ...exercise, like: updatedLike };
            }
            return exercise;
          });
          setFilteredExercises(updatedExercise);
        } else {
          throw new Error('Failed to update likes');
        }
      })
      .catch((error) => {
        console.error('Error updating likes:', error);
      });
  };

  const handleDislike = (exerciseId, updatedDislike) => {
    fetch(`http://localhost:3000/exercises/${exerciseId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dislikes: updatedDislike }),
    })
      .then((response) => {
        if (response.ok) {
          const updatedExercise = filteredExercises.map((exercise) => {
            if (exercise.id === exerciseId) {
              return { ...exercise, dislike: updatedDislike };
            }
            return exercise;
          });
          setFilteredExercises(updatedExercise);
        } else {
          throw new Error('Failed to update dislikes');
        }
      })
      .catch((error) => {
        console.error('Error updating dislikes:', error);
      });
  };

  return (
    <div className="exercise-display container mt-5">
      <div className="row">
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        ))}
      </div>
    </div>
  );
};

export default ExerciseDisplay;
