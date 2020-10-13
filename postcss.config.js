if (process.env.NODE_ENV === "production") {
    module.exports = {
      plugins: [
        require('postcss-cssnext')({
          browserslist: [
            '> 1%',
            'last 2 versions',
          ],
        }),
        require("cssnano"),
        // Tous les modules CSS que tu souhaite
      ],
    };
  }