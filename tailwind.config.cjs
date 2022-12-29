const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: ['garden'],
  },
}

module.exports = config
