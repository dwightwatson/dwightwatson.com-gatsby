import React from "react"
import Image from "./image";
import { StaticQuery, graphql } from "gatsby"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata

        return (
          <div className="flex justify-between items-center border-2 border-blue-500 p-4 mb-5 text-lg">
            <p className="mr-5">A blog about Laravel & Rails,<br/>written by <a href={`https://twitter.com/${social.twitter}`} className="underline" target="_blank" rel="noopener noreferrer">{author}</a>.</p>
            <Image />
          </div>
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
