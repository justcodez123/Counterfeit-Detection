import React from 'react';
import './StatusModal.css';

const StatusModal = ({ isOpen, onClose, statusMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Status Update</h2>
        <p>{statusMessage}</p>
        <button className="modal-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default StatusModal;
