// ~/stores/cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: {
            items: [],
            couponApplied: null
        }
    }),

    getters: {
        itemCount: (state) => {
            return state.cart.items.reduce((count, item) => count + item.quantity, 0);
        },

        subtotal: (state) => {
            return state.cart.items.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
        },

        discount: (state) => {
            if (!state.cart.couponApplied) return 0;

            if (state.cart.couponApplied.type === 'percentage') {
                return (state.cart.couponApplied.value / 100) * this.subtotal;
            } else if (state.cart.couponApplied.type === 'fixed') {
                return state.cart.couponApplied.value;
            }

            return 0;
        },

        total: (state) => {
            return this.subtotal - this.discount;
        },

        isEmpty: (state) => {
            return state.cart.items.length === 0;
        }
    },

    actions: {
        addItem(product, quantity = 1) {
            const existingItem = this.cart.items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.cart.items.push({
                    id: product.id,
                    title: product.title,
                    author: product.author,
                    price: product.price,
                    image: product.image,
                    quantity
                });
            }

            // Persist to localStorage
            this.saveCartToStorage();
        },

        removeItem(productId) {
            this.cart.items = this.cart.items.filter(item => item.id !== productId);
            this.saveCartToStorage();
        },

        increaseQuantity(productId) {
            const item = this.cart.items.find(item => item.id === productId);
            if (item) {
                item.quantity += 1;
                this.saveCartToStorage();
            }
        },

        decreaseQuantity(productId) {
            const item = this.cart.items.find(item => item.id === productId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    this.removeItem(productId);
                }
                this.saveCartToStorage();
            }
        },

        applyCoupon(coupon) {
            this.cart.couponApplied = coupon;
            this.saveCartToStorage();
        },

        removeCoupon() {
            this.cart.couponApplied = null;
            this.saveCartToStorage();
        },

        clearCart() {
            this.cart.items = [];
            this.cart.couponApplied = null;
            this.saveCartToStorage();
        },

        saveCartToStorage() {
            if (process.client) {
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        },

        loadCartFromStorage() {
            if (process.client) {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    this.cart = JSON.parse(savedCart);
                }
            }
        },

        // Initialize cart on app load
        init() {
            this.loadCartFromStorage();
        }
    }
});