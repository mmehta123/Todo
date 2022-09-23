import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <div className='d-flex justify-content-center align-items-center flex-column '>
            <p className='h2 mt-5'>
                Error404
            </p>
            <Link to="/" style={{ textDecoration: "none" }}>
                Go To HomePage
            </Link>
        </div>
    )
}

export default Error404