import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'

import './index.css'

const JobItem = props => {
  const {jobs} = props
  //   console.log(jobs)

  return (
    <Link className="link-for-job-details" to={`/jobs/${jobs.id}`}>
      <li className="jobs-list-items">
        <div className="company-logo-section">
          <img
            className="company-logo"
            alt="company logo"
            src={jobs.companyLogoUrl}
          />
          <div className="position">
            <h1 className="postion-text">{jobs.title}</h1>
            <div className="ratings-container">
              <AiFillStar className="star" />
              <p className="rating">{jobs.rating}</p>
            </div>
          </div>
        </div>
        <div className="range-section">
          <div className="row-1">
            <div className="location-details">
              <GoLocation />
              <p className="location-text">{jobs.location}</p>
            </div>
            <div className="job-type-details">
              <BsBriefcaseFill />
              <p className="job-type-text">{jobs.employmentType}</p>
            </div>
          </div>
          <div className="salary-range">
            <p className="salary">{jobs.packageAsPerAnum}</p>
          </div>
        </div>
        <hr className="card-hr" />
        <div className="desc-container1">
          <h1 className="desc-title">Description</h1>
          <p className="desc">{jobs.jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
