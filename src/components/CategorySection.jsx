import React from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import Widget from './Widget';
import useDashboardStore from '../store/dashboardStore';
import '../styles/category.css';

const CategorySection = ({ categoryName, widgets, onAddWidget }) => {
  const removeCategory = useDashboardStore((state) => state.removeCategory);
  
  const handleRemoveCategory = () => {
    if (window.confirm(`Are you sure you want to remove the "${categoryName}" category and all its widgets?`)) {
      removeCategory(categoryName);
    }
  };
  return (
    <div className="category-section mb-4 ">
    <div className="category-header d-flex justify-content-between align-items-center mb-3 p-4">
      <h4 className="category-title text-white m-auto">{categoryName}</h4>
      <div>
        <button 
          className="btn btn-sm btn-outline-primary me-2" 
          onClick={() => onAddWidget(categoryName)}
          title="Add widget"
        >
          <FaPlus /> Add Widget
        </button>
        <button 
          className="btn btn-sm btn-outline-danger" 
          onClick={handleRemoveCategory}
          title="Remove category"
        >
          <FaTrash />
        </button>
      </div>
    </div>

    {widgets && widgets.length > 0 ? (
  <div className="widget-slider-container">
    {widgets.map((widget) => (
      <div className="widget-slide" key={widget.name}>
        <Widget category={categoryName} widget={widget} />
      </div>
    ))}
  </div>
) : (
  <div className="alert alert-secondary">No widgets in this category.</div>
)}

    </div>
  );
};

export default CategorySection;




