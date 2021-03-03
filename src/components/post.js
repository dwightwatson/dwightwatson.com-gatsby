import React from "react"
import { Link } from "gatsby"

const Post = ({ node }) => {
  return (
    <div className="mb-12">
      <div className="mb-4">
        <small>{node.frontmatter.date}</small>
        <h3>
          <Link
            className="text-xl text-blue-700 underline"
            to={node.frontmatter.path}
          >
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

export default Post
