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
        <h1 className="text-2xl">
          <Link to={`/`}>{title}</Link>
        </h1>
      )
    } else {
      header = (
        <h3 className="text-xl">
          <Link to={`/`}>{title}</Link>
        </h3>
      )
    }

    return (
      <div className="font-sans border-t-2 border-orange-500">
        <div className="max-w-lg px-4">
          <header className="py-4">{header}</header>
          <main>{children}</main>
        </div>
      </div>
    )
  }
}

export default Layout
