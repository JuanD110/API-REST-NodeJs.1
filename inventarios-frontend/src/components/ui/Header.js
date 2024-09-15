import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    

    <nav ClassName="navbar navbar-expand-lg navbar-dark bg-dark">
        <div ClassName="container-fluid">
            <NavLink ClassName="navbar-brand" exact to='/'>PelisPlay</NavLink>
    
            <button ClassName="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span ClassName="navbar-toggler-icon"></span>
            </button>

            <div ClassName="collapse navbar-collapse" id="navbarSupportedContent">
                <ul ClassName="navbar-nav me-auto mb-2 mb-lg-0">
                    
                    <li ClassName="nav-item">
                        <NavLink ClassName="nav-link " activeClassName='active' exact to='/media'>Media</NavLink>
                    </li>
                    
                    <li ClassName="nav-item">
                        <NavLink ClassName="nav-link " activeClassName='active' exact to='/director'>Directores</NavLink>
                    </li>
                    
                    <li ClassName="nav-item">
                        <NavLink ClassName="nav-link " activeClassName='active' exact to='/tipo'>Tipo</NavLink>
                    </li>
                    
                    <li ClassName="nav-item">
                        <NavLink ClassName="nav-link " activeClassName='active' exact to='/genero'>Genero</NavLink>
                    </li>
                    
                    <li ClassName="nav-item">
                        <NavLink ClassName="nav-link " activeClassName='active' exact to='/productora'>Productora</NavLink>
                    </li>
                
            </ul>
            
            </div>
        </div>
    </nav>
  )
}


