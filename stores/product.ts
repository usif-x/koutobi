import { defineStore } from 'pinia';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  author: string;
  publisher: string;
  publishDate: string;
  language: 'ar' | 'en';
  pages: number;
  isbn: string;
}

interface FilterState {
  category: string;
  priceRange: [number, number];
  rating: number;
  language: string;
  search: string;
  sortBy: string;
}

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    filters: {
      category: '',
      priceRange: [0, 1000],
      rating: 0,
      language: '',
      search: '',
      sortBy: 'newest'
    } as FilterState,
    categories: [
      'رواية',
      'قصص قصيرة',
      'شعر',
      'تاريخ',
      'دين',
      'فلسفة',
      'علوم',
      'أدب',
      'سياسة'
    ],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    filteredProducts: (state) => {
      let result = [...state.products];

      // Search filter
      if (state.filters.search) {
        const searchTerm = state.filters.search.toLowerCase();
        result = result.filter(product => 
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.author.toLowerCase().includes(searchTerm)
        );
      }

      // Category filter
      if (state.filters.category) {
        result = result.filter(product => 
          product.category === state.filters.category
        );
      }

      // Price range filter
      result = result.filter(product => 
        product.price >= state.filters.priceRange[0] &&
        product.price <= state.filters.priceRange[1]
      );

      // Rating filter
      if (state.filters.rating > 0) {
        result = result.filter(product => 
          product.rating >= state.filters.rating
        );
      }

      // Language filter
      if (state.filters.language) {
        result = result.filter(product => 
          product.language === state.filters.language
        );
      }

      // Sorting
      switch (state.filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
          );
          break;
      }

      return result;
    },

    totalProducts: (state) => state.products.length,
    filteredCount: (state) => state.products.length
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        // Simulating API call with test data
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.products = testProducts;
      } catch (error) {
        this.error = 'Failed to fetch products';
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },

    updateFilters(newFilters: Partial<FilterState>) {
      this.filters = { ...this.filters, ...newFilters };
    },

    resetFilters() {
      this.filters = {
        category: '',
        priceRange: [0, 1000],
        rating: 0,
        language: '',
        search: '',
        sortBy: 'newest'
      };
    }
  }
});

// Test data
const testProducts: Product[] = [
  {
    id: 1,
    title: 'الرياضيات للصف الأول الثانوي - الفصل الدراسي الأول',
    description: 'رواية عن عائلة مصرية تعود إلى وطنها بعد سنوات من الغربة',
    price: 120,
    category: 'رواية',
    image: '/images/books/Book.png',
    rating: 4.5,
    stock: 50,
    author: 'أحمد خالد توفيق',
    publisher: 'دار الشروق',
    publishDate: '2024-01-15',
    language: 'ar',
    pages: 320,
    isbn: '9789777651234'
  },
  {
  id: 4,
  title: 'الرياضيات للصف الأول الثانوي - الفصل الدراسي الأول',
  description: 'دراسة شاملة عن تاريخ العلوم في الحضارة العربية',
  price: 180,
  category: 'تاريخ',
  image: '/images/books/Book.png',
  rating: 4.7,
  stock: 25,
  author: 'د. حسن الشافعي',
  publisher: 'دار العلم',
  publishDate: '2024-02-15',
  language: 'ar',
  pages: 450,
  isbn: '9789777651237'
},
{
  id: 5,
  title: 'الرياضيات للصف الأول الثانوي - الفصل الدراسي الأول',
  description: 'مجموعة شعرية معاصرة',
  price: 85,
  category: 'شعر',
  image: '/images/books/Book.png',
  rating: 4.3,
  stock: 40,
  author: 'سارة محمود',
  publisher: 'دار الشعر',
  publishDate: '2024-02-20',
  language: 'ar',
  pages: 120,
  isbn: '9789777651238'
}
];