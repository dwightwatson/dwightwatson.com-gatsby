import React from "react"

import Layout from "../components/layout"
import Post from "../components/post"
import { Link, graphql } from "gatsby"

const Tags = (props) => {
  const { pageContext, data } = props;
  const { tag } = pageContext
  const siteTitle = props.data.site.siteMetadata.title
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout location={props.location} title={siteTitle}>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => <Post key={node.fields.slug} node={node}/>)}
      </ul>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
