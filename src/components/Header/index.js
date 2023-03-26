import './index.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    console.log(history)
    const token = Cookies.remove('jwt_token')
    if (token === undefined) {
      history.replace('/login')
    }
  }

  return (
    <header className="nav-bar">
      <Link to="/">
        <img
          className="logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <ul className="nav-text">
        <Link className="link" to="/">
          <li className="list">Home</li>
        </Link>
        <Link className="link" to="/jobs">
          <li className="list">Jobs</li>
        </Link>
      </ul>
      <li className="btn-link">
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </header>
  )
}

export default Header
