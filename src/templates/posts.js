import React from "react"
import { graphql, Link } from "gatsby"

import Post from "../components/post"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numberOfPages } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />

        {posts.map(({ node }) => (
          <Post key={node.id} node={node} />
        ))}

        <ul className="mb-5">
          <li className="mb-5">
            {currentPage > 1 && (
              <Link
                to={`/pages/${currentPage - 1}`}
                rel="prev"
                className="underline"
              >
                ← Previous page
              </Link>
            )}
          </li>
          <li className="text-right">
            {currentPage < numberOfPages && (
              <Link
                to={`/pages/${currentPage + 1}`}
                rel="next"
                className="underline"
              >
                Next page →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            path
            date(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`
