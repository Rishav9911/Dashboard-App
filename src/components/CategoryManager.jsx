
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import useDashboardStore from '../store/dashboardStore';
import { FaTimes } from 'react-icons/fa';

const CategoryManager = () => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const addCategory = useDashboardStore((state) => state.addCategory);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
      setShowForm(false);
    }
  };

  return (
    <div className="category-manager mb-4 position-relative">
      {!showForm && (
        <button
          className="btn btn-primary d-flex align-items-center gap-2 rounded-pill px-4 py-2 shadow-sm"
          onClick={() => setShowForm(true)}
        >
          <FaPlus size={14} /> Add New Category
        </button>
      )}

      {showForm && (
        <div className="category-form-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
          onClick={() => setShowForm(false)}>
          <div
            className="card border-0 shadow-lg rounded-3 overflow-hidden"
            style={{ maxWidth: '450px', width: '100%' }}
            onClick={(e) => e.stopPropagation()}>
            <div className="card-header text-white py-3 d-flex justify-content-between align-items-center"
              style={{ backgroundColor: ' #4E4FEB' }} >
              <h5 className="card-title m-0 fw-bold">Add New Category</h5>
              <button
                className="btn btn-sm rounded-4 btn-outline-danger bg-white"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="categoryName" className="form-label fw-medium mb-2">Category Name</label>
                  <input
                    id="categoryName"
                    type="text"
                    className="form-control form-control-lg border-secondary-subtle"
                    placeholder="Enter category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={!newCategoryName.trim()}
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;