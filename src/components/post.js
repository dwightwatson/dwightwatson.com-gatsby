import React from "react"
import { Link } from "gatsby"

export default ({ node }) => {
  return (
    <div className="mb-12">
      <div className="mb-4">
        <small>{node.frontmatter.date}</small>
        <h3>
          <Link className="text-xl underline" to={node.frontmatter.path}>
            {node.frontmatter.title}
          </Link>
        </h3>
      </div>

      <p
        dangerouslySetInnerHTML={{
          __html: node.excerpt,
        }}
      />
    </div>
  )
}
