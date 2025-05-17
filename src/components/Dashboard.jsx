// src/components/Dashboard.jsx
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
    setInitialData(initialData);
  }, [setInitialData]);
  
  const filteredCategories = getFilteredWidgets();

    // Debug logging for search functionality
    useEffect(() => {
        console.log( searchQuery);
        console.log(filteredCategories);
      }, [searchQuery, filteredCategories]);
  
  const handleAddWidgetClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowAddModal(true);
  };
  
  const handleCloseModal = () => {
    setShowAddModal(false);
  };
return (
  <div className="container mt-4 bg-dark">
    
    <div className="row mb-4 ">
      <div className="col-md-6">
        <SearchBar />
      </div>
      <div className="col-md-6 d-flex justify-content-end">
        <CategoryManager />
      </div>
    </div>

{Object.entries(filteredCategories).map(([categoryName, widgets]) => {
        const visibleWidgetNames = visibility[categoryName];

        // Only pass visible widgets to CategorySection
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

    
    {/* Add Widget Modal */}
    <AddWidgetModal 
      show={showAddModal}
      onClose={handleCloseModal}
      categoryName={selectedCategory}
    />
  </div>
);
};


export default Dashboard;

