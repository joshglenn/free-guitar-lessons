const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
        allDatoCmsLesson {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsLesson.edges.map(({ node: lesson }) => {
        createPage({
          path: `lessons/${lesson.slug}`,
          component: path.resolve(`./src/templates/lesson.js`),
          context: {
            slug: lesson.slug,
          },
        })
      })
      resolve()
    })
  })
}
