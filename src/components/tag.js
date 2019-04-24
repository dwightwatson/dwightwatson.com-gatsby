import { kebabCase } from "lodash"
import React from "react"
import { Link } from "gatsby"

const Tag = ({ tag }) => (
  <Link to={`/tags/${kebabCase(tag)}`} className="underline text-sm text-blue-500 mr-4">#{kebabCase(tag)}</Link>
)

export default Tag;
