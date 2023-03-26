import './index.css'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

const Home = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Header />
      <div className="container">
        <section className="hero-section">
          <h1 className="hero-heading">Find The Job That Fits Your Life</h1>
          <p className="hero-desc">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="find-jobs-btn" type="button">
              Find Jobs
            </button>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Home
