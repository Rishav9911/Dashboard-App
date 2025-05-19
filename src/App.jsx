
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Manage from './components/ManageWidgets';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './styles/managewidgets.css'; // Add this new CSS file

function App() {
  const [showManage, setShowManage] = useState(false);

  const toggleManage = () => setShowManage(!showManage);

  return (
    <div className="app">
      <nav className="navbar bg-light text-black">
        <div className="container d-flex justify-content-between align-items-center">
          <span className="navbar-brand mb-0 h1">Dashboard</span>
          <button className="btn btn-outline-dark text-blackt" onClick={toggleManage}>
            Manage Widgets
          </button>
        </div>
      </nav>

      {/* Blurred background when Manage is open */}
      {showManage && <div className="backdrop-blur" onClick={toggleManage}></div>}

      {/* Manage Side Panel */}
      {showManage && <Manage onClose={toggleManage} />}

      <div className="bg-dark text-white"> 
      <main className={showManage ? 'blur-bg' : ''} >
        <Dashboard />
      </main>
      </div>

      <footer className="footer mt-auto py-3 bg-dark text-white">
        <div className="container text-center text-white">
          <span className=" text-white">Rishav@Dashboard</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
