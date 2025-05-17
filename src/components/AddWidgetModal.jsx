import React, { useState, useEffect } from 'react';
import useDashboardStore from '../store/dashboardStore';
import '../styles/addwidgetmodal.css';

const AddWidgetModal = ({ show, onClose, categoryName }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  
  const addWidget = useDashboardStore((state) => state.addWidget);
  
  // Reset form when modal opens with a new category
  useEffect(() => {
    if (show) {
      setWidgetName('');
      setWidgetText('');
    }
  }, [show, categoryName]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new widget and add it to the selected category
    const newWidget = {
      name: widgetName,
      text: widgetText
    };
    
    addWidget(categoryName, newWidget);
    
    // Close modal
    onClose();
  };
  
  if (!show) {
    return null;
  }
  
  const stop = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div className="modal-1" onClick={onClose}>
      <div className="modal-2">
        <div className="modal-3" onClick={stop}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title p-4 text-white mb-2 rounded-2" style={{backgroundColor:'#4E4FEB'}} >Add New Widget to {categoryName}</h5>

            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="widgetName" className="form-label">Widget Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="widgetName"
                    value={widgetName}
                    onChange={(e) => setWidgetName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="widgetText" className="form-label">Widget Content</label>
                  <textarea
                    className="form-control"
                    id="widgetText"
                    value={widgetText}
                    onChange={(e) => setWidgetText(e.target.value)}
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  Add Widget
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
