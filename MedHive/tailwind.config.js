export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        backgroundImage: {
          'custom-image': "url('./public/img.png')", 
        },
      },
    },
    plugins: [],
  };