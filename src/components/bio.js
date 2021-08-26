import React from "react"
import Image from "./image"
import { StaticQuery, graphql } from "gatsby"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={(data) => {
        const { author, social } = data.site.siteMetadata

        return (
          <div className="border-2 border-blue-500 mb-5">
            <div className="flex justify-between items-center p-4">
              <p className="mr-5">
                A blog about Laravel & Rails by {author};<br />
                <span className="text-sm">
                  developer of{" "}
                  <a
                    href="https://www.roomies.com"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Roomies.com
                  </a>
                  ,{" "}
                  <a
                    href="https://www.myrent.co.nz"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    myRent.co.nz
                  </a>
                  ,{" "}
                  <a
                    href="https://highschoolnotes.com.au"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    High School Notes
                  </a>{" "}
                  &amp;{" "}
                  <a
                    href="https://studentvip.com.au"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    StudentVIP.com.au
                  </a>
                  .
                </span>
              </p>
              <Image />
            </div>

            <div className="bg-blue-100 text-xs p-4 ">
              <p>
                Follow me on{" "}
                <a
                  href={`https://twitter.com/${social.twitter}`}
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                , or{" "}
                <a
                  href={`https://github.com/${social.github}`}
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
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
          github
        }
      }
    }
  }
`

export default Bio
