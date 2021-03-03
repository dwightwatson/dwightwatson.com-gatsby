import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Image = () => (
  <StaticQuery
    query={graphql`
      {
        placeholderImage: file(relativePath: { eq: "dwight-watson.jpg" }) {
          childImageSharp {
            gatsbyImageData(width: 80, layout: CONSTRAINED)
          }
        }
      }
    `}
    render={(data) => (
      <GatsbyImage
        className="inline-block rounded-full overflow-hidden w-20"
        alt=""
        image={data.placeholderImage.childImageSharp.gatsbyImageData}
      />
    )}
  />
)

export default Image
