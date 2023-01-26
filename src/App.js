import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import MessagingPage from './components/MessagingPage';
import UserPage from './components/UserPage'

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/messages' element={<MessagingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user/:id' element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
