import React from 'react'

function Header() {
  return (
    <nav className='navbar navbar-expand-sm sticky-top navbar-light bg-warning'>
        <div className='container-fluid'>
            <a className='navbar-brand text-black-50 fw-bolder'>
                EXPENSE TRACKER
            </a>
            <div className='navbar-collapse justify-content-end'>
                <ul className='navbar-nav gap-x-4'>
                    <li className='nav-item'>
                        <a href="" className='nav-link'>
                            <i className='fa-solid fa-home fs-5'/>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href="" className='nav-link'>
                            <i className='fa-solid fa-plus fs-5'/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Header