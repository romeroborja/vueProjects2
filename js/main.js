const API = "https://api.github.com/users/";

const app = Vue.createApp({
    data() {
        return {
            search: null,
            result: null,
            error: null,
            favorites: new Map()
        }
    },
    computed: {
        checkHasFavorite() {
            return this.favorites.has(this.result.id);
        }
    },
    methods: {
        async getUser () {
            this.result = this.error = null;
            try {
                const response = await fetch(API + this.search);
                if (!response.ok) throw Error('User not exist');
                const data = await response.json();
                this.result = data;
            } catch (error) {
                this.error = error;
            } finally {
                this.search = null;
            }            
        },
        addFavorite() {
            this.favorites.set(this.result.id, this.result); 
        },
        removeFavorite() {
            this.favorites.delete(this.result.id); 
        }
    }
  }).mount('#app')
