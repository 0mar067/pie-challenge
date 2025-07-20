
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import EditGoal from './Components/pages/EditGoal';

function App() {
 

  return (
    <>
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/edit/:id" element={<EditGoal />} />
    </Routes>
   </Router>
   
    </>
  )
}

export default App
