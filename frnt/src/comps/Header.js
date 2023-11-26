import React from 'react';
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <nav className="navbar bg-dark custom-header">
        <div className="container-fluid">
            <Link className="navbar-brand text-light text-center fw-bold fnt-kanit" to="/">Todos</Link>
        </div>
    </nav>
  )
}

export default Header
