import React from "react";
import "./app.css";
const App = () => {
  return (
    <div className="login-container">
      <div className="form-section">
        <h2>Brand Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="brandId">Brand ID *</label>
            <input
              type="text"
              id="brandId"
              placeholder="ID should be Unique"
            />
          </div>
          <div className="form-group">
            <label htmlFor="brandName">Brand Name *</label>
            <input
              type="text"
              id="brandName"
              placeholder="Enter the Brand Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="login-btn">
              Login
            </button>
            <button type="button" className="back-btn">
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;