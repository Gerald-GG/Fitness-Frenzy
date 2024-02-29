import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import ExerciseDisplay from './components/ExerciseDisplay';
import ExerciseDetails from './components/ExerciseDetails';
import ExerciseDailyRoutine from './components/ExerciseDailyRoutine';
import AddExercise from './components/AddExercise';
import CommentSection from './components/CommentSection';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="Container">
      <div className="App">
        <h1 className="text-warning mt-4">FITNESS FRENZY GYM 💪🏋️🏋️‍♀️ 🤼‍♂️</h1>
        <br></br>
        <Router>
          <NavBar />
          <SearchBar onSearch={handleSearch} />
          <Routes>
            <Route
              path="/"
              element={<ExerciseDisplay searchTerm={searchTerm} />}
            />
            <Route path="/exercise-details/:id" element={<ExerciseDetails />} />
            <Route path="/exercise-daily-routine" element={<ExerciseDailyRoutine />} />
            <Route path="/add-exercise" element={<AddExercise />} />
            <Route path="/comments" element={<CommentSection />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
export default App;

