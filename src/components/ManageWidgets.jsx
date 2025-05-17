
import React, { useState } from 'react';
import useDashboardStore from '../store/dashboardStore';
import { FaTimes } from 'react-icons/fa';

const Manage = ({ onClose }) => {
  const categories = useDashboardStore((state) => state.categories);
  const visibility = useDashboardStore((state) => state.visibility);
  const togglewv = useDashboardStore((state) => state.togglewv);
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="manage-panel bg-dark">
      <div className="manage-header d-flex justify-content-between align-items-center mb-3 text-white">
        <h5 className="m-0 ">Manage Widgets</h5>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={onClose}
        >
          <FaTimes />
        </button>
      </div>

      <div className="category-slider-wrapper mb-3">
        <div className="category-slider d-flex">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm me-2 ${activeCategory === cat ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>


      {activeCategory && (
        <div>
          <h6 className='text-white'>Widgets in: {activeCategory}</h6>
          {categories[activeCategory].map((widget) => (
            <div className="form-check text-white" key={widget.name}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`${activeCategory}-${widget.name}`}
                checked={visibility[activeCategory]?.includes(widget.name)}
                onChange={() => togglewv(activeCategory, widget.name)}
              />
              <label
                className="form-check-label"
                htmlFor={`${activeCategory}-${widget.name}`}
              >
                {widget.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Manage;
