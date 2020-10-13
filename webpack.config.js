// Webpack utilise ce module pour travailler avec les dossiers.
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Ceci est la configuration principale de ton projet
// Ici, tu peux écrire les différentes options que tu souhaites et dire à Webpack que faire.
module.exports = {
    // Turn on watch mode, pour vérifier les changements et les compiler sans refaire '$ npm run build' :
  
  // Ceci est le chemin de ton point d'entrée. C'est depuis ce fichier que Webpack commencera à travailler.
  entry: "./src/js/index.js",

  // Ceci sera le chemin et le nom du fichier qui résultera de ton bundle
  // Webpack va compresser tout ton Javascript dans un seul fichier
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
        {
            test: /\.(woff|woff2|ttf|otf|eot)$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  outputPath: 'fonts',
                },
              },
            ],
          },
        {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  outputPath: 'images',
                },
              },
            ],
          },
        
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
            test: /\.(scss)$/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'resolve-url-loader',
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ]
          },
      ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
  ],

  // Par défaut, le mode de Webpack est "production". En fonction de ce qui est écrit ici, tu pourras appliquer différentes méthodes dans ton bundle final.
  // Pour le moment, nous avons besoin de paramètres de développement. Nous n'avons, par exemple, pas besoin de minifier notre code, nous allons donc le mettre en "développement"
  mode: "development",
};