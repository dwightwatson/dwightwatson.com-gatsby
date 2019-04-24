import React from "react"
import { StaticQuery, graphql } from "gatsby"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata

        return (
          <p className="border border-orange-500 p-4 mb-5">
            A blog about Laravel & Rails, written by <a href={`https://twitter.com/${social.twitter}`} className="underline">{author}</a>.
          </p>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
