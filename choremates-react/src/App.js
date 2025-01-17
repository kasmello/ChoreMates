import logo from './logo.svg';
import WelcomePage from './components/welcomePage/welcomePage';
import RegisterPage from './components/welcomePage/registerPage';
import CreateJoinPage from './components/createJoinPage/createJoinPage';
import ViewChores from './components/chorePages/viewChores';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/join" element={<CreateJoinPage />} />
      <Route path="/chores" element={<ViewChores />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
