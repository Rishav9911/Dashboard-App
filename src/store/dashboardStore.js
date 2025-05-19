import { create } from 'zustand';

const savedCategories = JSON.parse(localStorage.getItem('dashboard-widgets'));
const savedVisibility = JSON.parse(localStorage.getItem('dashboard-visibility'));

const useDashboardStore = create((set, get) => ({
  categories: savedCategories || {
    'CSPM Executive Dashboard': [],
    'CWPP Dashboard': [],
    'Registry Scan': []
  },

  visibility: savedVisibility || {
    'CSPM Executive Dashboard': [],
    'CWPP Dashboard': [],
    'Registry Scan': []
  },

  searchQuery: '',

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

  removeWidget: (category, widgetName) => {
    set((state) => ({
      categories: {
        ...state.categories,
        [category]: state.categories[category].filter(w => w.name !== widgetName)
      },
      visibility: {
        ...state.visibility,
        [category]: state.visibility[category].filter(name => name !== widgetName)
      }
    }));
  },

  addCategory: (categoryName) => {
    set((state) => {
      if (state.categories[categoryName]) return state;

      return {
        categories: {
          ...state.categories,
          [categoryName]: []
        },
        visibility: {
          ...state.visibility,
          [categoryName]: []
        }
      };
    });
  },

  removeCategory: (categoryName) => {
    set((state) => {
      const newCategories = { ...state.categories };
      const newVisibility = { ...state.visibility };
      delete newCategories[categoryName];
      delete newVisibility[categoryName];

      return {
        categories: newCategories,
        visibility: newVisibility
      };
    });
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

  setSearchQuery: (query) => set({ searchQuery: query }),

  setInitialData: (data) => {
    const initialVisibility = {};
    Object.entries(data).forEach(([cat, widgets]) => {
      initialVisibility[cat] = widgets.map(w => w.name);
    });
    set({ categories: data, visibility: initialVisibility });
  },

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

useDashboardStore.subscribe((state) => {
  localStorage.setItem('dashboard-widgets', JSON.stringify(state.categories));
  localStorage.setItem('dashboard-visibility', JSON.stringify(state.visibility));
});

export default useDashboardStore;
