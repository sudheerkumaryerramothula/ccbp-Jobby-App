import './index.css'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import {FiExternalLink} from 'react-icons/fi'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

class JobDetails extends Component {
  state = {
    jobDetail: [],
    skillsData: [],
    similarJobs: [],
    lifeAtCompanyData: {},
    showError: false,
    isLoading: true,
  }

  componentDidMount() {
    this.getJobDetailsBasedOnId()
  }

  getJobDetailsBasedOnId = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updateState = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const similarJobsData = data.similar_jobs
      const lifeAtCompany = data.job_details.life_at_company

      const {skills} = data.job_details
      this.setState({
        jobDetail: updateState,
        skillsData: skills,
        lifeAtCompanyData: lifeAtCompany,
        similarJobs: similarJobsData,
        isLoading: false,
      })
    } else {
      this.setState({showError: true})
    }
  }

  onClickReCallApi = () => {
    this.getJobDetailsBasedOnId()
  }

  render() {
    const {
      jobDetail,
      showError,
      skillsData,
      lifeAtCompanyData,
      similarJobs,
      isLoading,
    } = this.state

    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="job-details-container">
        <Header />
        <div>
          {showError ? (
            <div className="error-view">
              <img
                className="error-view-image"
                alt="failure view"
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              />
              <h1 className="error-title">Oops! Something Went Wrong</h1>
              <p className="error-desc">
                We cannot seem to find the page you are looking for.
              </p>
              <button
                type="button"
                className="error-btn"
                onClick={this.onClickReCallApi}
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {isLoading ? (
                <div className="spinner-container" data-testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              ) : (
                <ul className="card">
                  <li className="jobs-card-details">
                    <div className="company-row">
                      <img
                        className="card-company-img"
                        alt="job details company logo"
                        src={jobDetail.companyLogoUrl}
                      />
                      <div className="col">
                        <h1 className="card-title">{jobDetail.title}</h1>
                        <div className="row">
                          <AiFillStar className="star" />
                          <p className="rating">{jobDetail.rating}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row1">
                      <div className="r">
                        <div className="location-container">
                          <GoLocation />
                          <p className="location">{jobDetail.location}</p>
                        </div>
                        <div className="job-type-container">
                          <BsBriefcaseFill />
                          <p className="job-type">{jobDetail.employmentType}</p>
                        </div>
                      </div>
                      <div className="salary-package-container">
                        <p className="package">{jobDetail.packagePerAnnum}</p>
                      </div>
                    </div>
                    <hr className="hr-line" />
                    <div className="desc-container">
                      <h3 className="desc">Description</h3>
                      <div type="button" className="nav-link">
                        <a href={jobDetail.companyWebsiteUrl} className="link">
                          Visit
                        </a>
                        <FiExternalLink />
                      </div>
                    </div>
                    <p className="description">{jobDetail.jobDescription}</p>
                    <h3 className="skills-section">Skills</h3>
                    <div className="skills-container">
                      {skillsData.map(each => (
                        <div key={each.name} className="skills-row">
                          <img
                            className="skills-img"
                            alt={each.name}
                            src={each.image_url}
                          />
                          <p className="skills-title">{each.name}</p>
                        </div>
                      ))}
                    </div>
                    <h3 className="life-at-company-title">Life at Company</h3>
                    <div className="life-at-company-container">
                      <p className="life-at-company-desc">
                        {lifeAtCompanyData.description}
                      </p>
                      <img
                        className="life-at-company-image"
                        alt="life at company"
                        src={lifeAtCompanyData.image_url}
                      />
                    </div>
                  </li>

                  <h1 className="similar-jobs-title">Similar Jobs</h1>
                  <ul>
                    <li className="similar-jobs-container">
                      {similarJobs.map(each => (
                        <div className="similar-card-row" key={each.id}>
                          <div className="similar-card">
                            <div className="similar-card-logo-section">
                              <img
                                className="similar-logo"
                                alt="similar job company logo"
                                src={each.company_logo_url}
                              />
                              <div className="similar-card-rating">
                                <h1 className="similar-title">{each.title}</h1>
                                <div className="similar-rating">
                                  <AiFillStar className="star" />
                                  <p className="rating">{each.rating}</p>
                                </div>
                              </div>
                            </div>
                            <h1 className="similar-desc-title">Description</h1>
                            <p className="similar-desc">
                              {each.job_description}
                            </p>
                            <div className="similar-location-jobtype-details">
                              <div className="similar-location">
                                <GoLocation />
                                <p className="location">{each.location}</p>
                              </div>
                              <div className="similar-job-Type">
                                <BsBriefcaseFill />
                                <p className="job-type">
                                  {each.employment_type}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </li>
                  </ul>
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
}

export default JobDetails
