import './App.css';
import { HomePage } from './pages/home/HomePage';
import { AdminPage } from './pages/admin/AdminPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <div id="dialog-container"></div>
    </div>
  );
}

export default App;
