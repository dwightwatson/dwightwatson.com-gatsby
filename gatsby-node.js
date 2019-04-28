const _ = require(`lodash`)
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const postsTemplate = path.resolve(`./src/templates/posts.js`)
  const postTemplate = path.resolve(`./src/templates/post.js`)
  const tagsTemplate = path.resolve("src/templates/tags.js")

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                title
                path
                tags
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    const postsPerPage = 10
    const numberOfPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/pages/${i + 1}`,
        component: postsTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numberOfPages,
          currentPage: i + 1,
        },
      })
    })

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.frontmatter.path,
        component: postTemplate,
        context: {
          previous,
          next,
        },
      })
    })

    let tags = []

    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    tags = _.uniq(tags)

    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagsTemplate,
        context: {
          tag,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = node.frontmatter.path
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
