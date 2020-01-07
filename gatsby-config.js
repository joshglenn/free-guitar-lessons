require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Creative Portfolio`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
      },
    },
    // {
    //    resolve: `gatsby-plugin-remote-images`,
    //    options: {
    //      nodeType: 'allDatoCmsLesson',
    //      imagePath: 'coverImageUrl',
    //      // OPTIONAL: Name you want to give new image field on the node.
    //      // Defaults to 'localImage'.
    //      name: 'allItemImages',
    //    },
    // }
  ],
}
