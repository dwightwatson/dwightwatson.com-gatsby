import React from "react"
import { Link } from "gatsby"

import "./app.css";

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to={`/`}>{title}</Link>
        </h1>
      )
    } else {
      header = (
        <h3>
          <Link to={`/`}>{title}</Link>
        </h3>
      )
    }

    return (
      <div className="font-sans border-t-2 border-orange-500">
        <div className="container mx-auto">
          <header>{header}</header>
          <main>{children}</main>
        </div>
      </div>
    )
  }
}

export default Layout
