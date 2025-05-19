import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CategorySection from './CategorySection';
import CategoryManager from './CategoryManager';
import AddWidgetModal from './AddWidgetModal';
import useDashboardStore from '../store/dashboardStore';
import initialData from '../data/initialWidgets.json';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = useDashboardStore((state) => state.categories);
  const setInitialData = useDashboardStore((state) => state.setInitialData);
  const getFilteredWidgets = useDashboardStore((state) => state.getFilteredWidgets);
  const searchQuery = useDashboardStore((state) => state.searchQuery);
  const visibility = useDashboardStore((state) => state.visibility);

  useEffect(() => {
    const stored = localStorage.getItem('dashboard-widgets');
    if (!stored) {
      setInitialData(initialData);
    }
  }, [setInitialData]);

  const filteredCategories = getFilteredWidgets();

  const handleAddWidgetClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleResetDashboard = () => {
    const confirmed = window.confirm('Are you sure you want to reset the dashboard?');
    if (!confirmed) return;

    localStorage.removeItem('dashboard-widgets');
    localStorage.removeItem('dashboard-visibility');
    setInitialData(initialData);
    window.location.reload();
  };


  return (
    <div className="container mt-4 bg-dark text-white">
      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar />
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <CategoryManager />
          <button className="btn btn-danger d-flex align-items-center gap-2 rounded-pill px-4 py-1 shadow-sm ms-3"
            style={{ height: '45px' }} onClick={handleResetDashboard}>
            Reset Dashboard
          </button>
        </div>
      </div>

      {Object.entries(filteredCategories).map(([categoryName, widgets]) => {
        const visibleWidgetNames = visibility[categoryName] || [];
        const visibleWidgets = widgets.filter((w) =>
          visibleWidgetNames.includes(w.name)
        );

        return (
          <CategorySection
            key={categoryName}
            categoryName={categoryName}
            widgets={visibleWidgets}
            onAddWidget={handleAddWidgetClick}
          />
        );
      })}

      <AddWidgetModal
        show={showAddModal}
        onClose={handleCloseModal}
        categoryName={selectedCategory}
      />
    </div>
  );
};

export default Dashboard;

