import React from "react"
import { Link } from "gatsby"

const Tag = ({ tag }) => (
  <Link to={`/tags/${tag}`} className="underline text-sm text-blue-500 mr-4">#{tag}</Link>
)

export default Tag;
