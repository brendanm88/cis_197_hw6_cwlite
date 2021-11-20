import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom'
import axios from 'axios'

// need
const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signupUser = async () => {
    try {
      const { data } = await axios.post('/account/signup', { username, password })
      if (data === 'user created') {
        // reroute back to home page!
        navigate('/', { replace: true })
      }
    } catch (err) {
      // throw alert!
      window.alert('user creation has problems')
    }
  }

  return (
    <div>
      <h2>Signup Page</h2>
      username:
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      password:
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="submit" onClick={signupUser}>
        signup
      </button>
      <p>
        Already have an account?
        <Link to="/login">Login</Link>
      </p>

    </div>
  )
}

export default Signup
