import React from 'react';
import { BrowserRouter as  useNavigate } from'react-router-dom';
//import Login from './LoginPage/Login';
import './app.css'; 

function Home() {

/*  function MainPage() {
    const navigate = useNavigate();
  
    const handleLoginClick = () => {
      navigate('/login'); // Navigate to the login page
    };
    handleLoginClick();
  };*/
    

  return (
    <>
      <div className="app-container">
        <button className="loginButton" >Login</button>

        <div className="container">
          <div className="header">Product Verifier..</div>
          <div className="subHeader">using Blockchain</div>

          <div className="mainContent">
            <h1>
              Securely authenticate your product with{' '}
              <span className="highlight">Product Verifier</span>
            </h1>
            <p>
              Our Blockchain-based Product Verification System provides a secure and reliable way to
              authenticate your products and protect against fraud.
            </p>
            <button className="scanButton">Scan QR</button>
          </div>

          <div className="testingSection">
            <div className="testUser">
              <strong>Test User 1 :-</strong>
              <br />
              Brand ID: adminnike
              <br />
              Brand Name: NIKE
              <br />
              Password: admin
            </div>
            <div className="testUser">
              <strong>Test User 2 :-</strong>
              <br />
              Brand ID: adminpuma
              <br />
              Brand Name: PUMA
              <br />
              Password: admin
            </div>
          </div>

          <div className="illustration">
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;