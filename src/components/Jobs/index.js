import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItem from '../JobItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: [],
    jobItems: [],
    jobTypes: [],
    salaryRange: '',
    isLoading: true,
    Profilefailure: false,
    userSearchInput: '',
    apiCallError: false,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobItems()
  }

  getProfileDetails = async () => {
    const token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatatingState = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileDetails: updatatingState})
    } else {
      this.setState({Profilefailure: true})
    }
  }

  onChangeTypes = event => {
    const {jobTypes} = this.state
    const emType = jobTypes.filter(e => e === event.target.value)
    if (emType.length === 0) {
      this.setState(
        prevState => ({jobTypes: [...prevState.jobTypes, event.target.value]}),
        this.getJobItems,
      )
    } else {
      const filterData = jobTypes.filter(e => e !== event.target.value)
      this.setState({jobTypes: filterData}, this.getJobItems)
    }
  }

  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobItems)
  }

  getJobItems = async () => {
    const token = Cookies.get('jwt_token')
    const {jobTypes, salaryRange, userSearchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${jobTypes}&minimum_package=${salaryRange}&search=${userSearchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatingItems = data.jobs.map(e => ({
        id: e.id,
        companyLogoUrl: e.company_logo_url,
        employmentType: e.employment_type,
        jobDescription: e.job_description,
        location: e.location,
        packageAsPerAnum: e.package_per_annum,
        rating: e.rating,
        title: e.title,
      }))
      this.setState({jobItems: updatingItems, isLoading: false})
    } else {
      this.setState({isLoading: false, apiCallError: true})
    }
  }

  getJobsView = () => {
    const {jobItems, userSearchInput} = this.state
    const filterSearch = jobItems.filter(each =>
      each.title.toLowerCase().includes(userSearchInput.toLowerCase()),
    )
    const noJobsFound = jobItems.length === 0

    return (
      <>
        {noJobsFound ? (
          <div className="no-jobs-found">
            <img
              className="no-jobs"
              alt="no jobs"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            />
            <h1 className="notfound">No Jobs Found</h1>
            <p className="no-jobs-desc">
              We could not find any jobs Try other filters
            </p>
          </div>
        ) : (
          <ul className="jobs-card">
            {filterSearch.map(eachJob => (
              <JobItem jobs={eachJob} key={eachJob.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  userSearch = event => {
    this.setState({userSearchInput: event.target.value})
  }

  onClickSearchJob = event => {
    if (event.key === 'Enter') {
      this.getJobItems()
    }
  }

  onClickRetryAPiCall = () => {
    this.getJobItems()
  }

  apiCallFailureView = () => (
    <div className="api-call-error">
      <img
        className="api-call-error-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="api-call-error-heading">Oops! Something Went Wrong</h1>
      <p className="api-call-error-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryAPiCall}
      >
        Retry
      </button>
    </div>
  )

  onClockProfileApiCall = () => {
    this.getProfileDetails()
  }

  render() {
    const {
      profileDetails,
      isLoading,
      Profilefailure,
      userSearchInput,
      apiCallError,
    } = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <Header />
        <div className="jobs-container">
          <div className="sidebar">
            {Profilefailure ? (
              <div className="profile-failure">
                <button
                  className="retry-btn"
                  type="button"
                  onClick={this.onClockProfileApiCall}
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="profile-section">
                {isLoading ? (
                  <div className="profile-loader" data-testid="loader">
                    <Loader
                      type="TailSpin"
                      color="#000"
                      height="50"
                      width="50"
                    />
                  </div>
                ) : (
                  <div className="profile-details">
                    <img
                      className="profile-img"
                      alt="profile"
                      src={profileImageUrl}
                    />
                    <h1 className="profile-name">{name}</h1>
                    <p className="profile-bio">{shortBio}</p>
                  </div>
                )}
              </div>
            )}
            <hr />
            <ul className="employment-types">
              <h1 className="filter-title">Type of Employment</h1>
              {employmentTypesList.map(eachType => (
                <li className="row" key={eachType.employmentTypeId}>
                  <input
                    id={eachType.employmentTypeId}
                    type="checkbox"
                    value={eachType.employmentTypeId}
                    onChange={this.onChangeTypes}
                  />
                  <label htmlFor={eachType.employmentTypeId} className="type">
                    {eachType.label}
                  </label>
                </li>
              ))}
              <hr />
            </ul>
            <ul className="employment-types">
              <h1 className="filter-title">Salary Range</h1>
              {salaryRangesList.map(eachType => (
                <li className="row" key={eachType.salaryRangeId}>
                  <input
                    id={eachType.label}
                    type="radio"
                    value={eachType.salaryRangeId}
                    onChange={this.onChangeSalaryRange}
                  />
                  <label htmlFor={eachType.label} className="type">
                    {eachType.label}
                  </label>
                </li>
              ))}
              <hr />
            </ul>
          </div>
          <div className="job-items-container">
            <div className="search-container">
              <input
                type="search"
                className="search"
                placeholder="Search"
                onChange={this.userSearch}
                value={userSearchInput}
                onKeyDown={this.onClickSearchJob}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearchJob}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div>
              {isLoading ? (
                <div className="loader-container" data-testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              ) : (
                <>
                  {apiCallError
                    ? this.apiCallFailureView()
                    : this.getJobsView()}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
