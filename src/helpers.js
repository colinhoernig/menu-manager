const helpers = {

    // Format cents to USD
    formatPrice: (cents) => {
        return '$' + ((cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    },
    
    // Get a random element from an array
    getRandomElement: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    // Slugify a string
    slugify: function (text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    },

    // Generate random restaurant name
    getRandomRestaurantName: function () {
        var adjectives = ['crunchy', 'wet', 'dry', 'enticing', 'elegant', 'fancy', 'glamorous', 'slippery', 'coarse', 'plain'];
        var nouns = ['tacos', 'sushi', 'chicken', 'cereal', 'pizza', 'noodles', 'chocolate', 'potatos'];

        return `${this.getRandomElement(adjectives)}-${this.getRandomElement(nouns)}`;
    }
    
}

export default helpers;