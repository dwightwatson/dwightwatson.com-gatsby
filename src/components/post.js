import React from "react"
import { Link } from "gatsby"

export default ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <div className="mb-12">
      <div className="mb-4">
        <h3>
          <Link className="text-xl underline" to={node.fields.slug}>
            {title}
          </Link>
        </h3>
        <small>{node.frontmatter.date}</small>
      </div>

      <p
        dangerouslySetInnerHTML={{
          __html: node.excerpt,
        }}
      />
    </div>
  )
}
