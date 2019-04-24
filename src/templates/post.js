import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Tag from "../components/tag"
import Layout from "../components/layout"
import SEO from "../components/seo"

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

        <div className="mb-4">
          <h1 className="text-2xl">{post.frontmatter.title}</h1>
          <small>{post.frontmatter.date}</small>
        </div>

        <div className="mb-8">
          {post.frontmatter.tags && post.frontmatter.tags.map(tag => <Tag key={tag} tag={tag} />)}
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <hr/>
        <Bio />

        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev" className="underline">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next" className="underline">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
