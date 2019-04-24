import React from "react"
import { StaticQuery, graphql } from "gatsby"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata

        return (
          <p className="border-2 border-blue-500 p-4 mb-5">
            A blog about Laravel & Rails, written by <a href={`https://twitter.com/${social.twitter}`} className="underline" target="_blank" rel="noopener noreferrer">{author}</a>.
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
