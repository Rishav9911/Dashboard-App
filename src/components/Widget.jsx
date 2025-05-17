import React from 'react';
import { FaTimes } from 'react-icons/fa';
import useDashboardStore from '../store/dashboardStore';
import '../styles/widget.css';

const Widget = ({ category, widget }) => {
  const removeWidget = useDashboardStore(state => state.removeWidget);

  const handleRemove = () => {
    removeWidget(category, widget.name);
  };

  return (
    <div className="card mb-3 widget-card  ">
      <div className="card-body border rounded-3 p-5 ">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title text-white ">{widget.name}</h5>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleRemove}
            title="Remove widget"
          >
            <FaTimes />
          </button>
        </div>
        <p className="card-text text-white">{widget.text}</p>
      </div>
    </div>
  );
};

export default Widget;
