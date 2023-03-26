import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'

import './App.css'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import jobDetails from './components/jobDetails'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/jobs" component={Jobs} />
      <Route exact path="/jobs/:id" component={jobDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
