import { create } from 'zustand';

// Initial structure - start empty (can preload from a file if needed)
const useDashboardStore = create((set, get) => ({
  categories: {
    'CSPM Executive Dashboard': [],
    'CWPP Dashboard': [],
    'Registry Scan': []
  },
  visibility: {
    'CSPM Executive Dashboard': [],
    'CWPP Dashboard': [],
    'Registry Scan': []
  }, 

  searchQuery: '',

    // Action: Add a new category
    addCategory: (categoryName) => {
      set((state) => {
        // Check if category already exists
        if (state.categories[categoryName]) {
          return state; // No change if category exists
        }
        
        return {
          categories: {
            ...state.categories,
            [categoryName]: [] // New category starts with empty widgets array
          }
        };
      });
    },
    
    // Action: Remove a category
    removeCategory: (categoryName) => {
      set((state) => {
        // Create a copy of categories
        const newCategories = { ...state.categories };
        
        // Delete the specified category
        delete newCategories[categoryName];
        
        return { categories: newCategories };
      });
    },

  // Add this inside useDashboardStore:
addWidget: (category, widget) => {
  set((state) => ({
    categories: {
      ...state.categories,
      [category]: [...state.categories[category], widget]
    },
    visibility: {
      ...state.visibility,
      [category]: [...(state.visibility[category] || []), widget.name] 
    }
  }));
},


  // Action: Remove widget from a specific category by name
  removeWidget: (category, widgetName) => {
    set((state) => ({
      categories: {
        ...state.categories,
        [category]: state.categories[category].filter(w => w.name !== widgetName)
      }
    }));
  },

  togglewv: (category, widgetName) => {
    set((state) => {
      const isVisible = state.visibility[category]?.includes(widgetName);
      const newVisibility = isVisible
        ? state.visibility[category].filter(name => name !== widgetName)
        : [...(state.visibility[category] || []), widgetName];

      return {
        visibility: {
          ...state.visibility,
          [category]: newVisibility
        }
      };
    });
  },

  initializeVisibilityForCategory: (category) => {
    const state = get();
    const currentWidgets = state.categories[category]?.map(w => w.name) || [];
    const existing = state.visibility[category];

    if (!existing || existing.length === 0) {
      set({
        visibility: {
          ...state.visibility,
          [category]: currentWidgets
        }
      });
    }
  },

  // Action: Set search query
  setSearchQuery: (query) => set({ searchQuery: query }),

  // In dashboardStore.js
  setInitialData: (data) => {
    const initialVisibility = {};
    Object.entries(data).forEach(([cat, widgets]) => {
      initialVisibility[cat] = widgets.map(w => w.name);
    });
    set({ categories: data, visibility: initialVisibility });
  },
  

  // Getter: Filter widgets across all categories
  getFilteredWidgets: () => {
    const { categories, searchQuery } = get();
    if (!searchQuery) return categories;

    const lowerQuery = searchQuery.toLowerCase();

    const filtered = {};
    for (const [cat, widgets] of Object.entries(categories)) {
      filtered[cat] = widgets.filter(w =>
        w.name.toLowerCase().includes(lowerQuery) ||
        w.text.toLowerCase().includes(lowerQuery)
      );
    }
    return filtered;
  }

}));

export default useDashboardStore;


