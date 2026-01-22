module.exports = {
    plugins: [
        require('@tailwindcss/postcss')(),
        require('postcss-nesting')(),
        require('cssnano')({
            preset: 'default',
        }),
    ],
};
