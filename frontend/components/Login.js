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

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginUser = async () => {
    try {
      const { data } = await axios.post('/account/login', { username, password })
      if (data === 'user logged in successfully') {
        // reroute back to home page!
        navigate('/', { replace: true })
      } else {
        window.alert(data)
      }
    } catch (err) {
      // throw alert!
      window.alert('user login has problems')
    }
  }

  return (
    <div>
      <h2>Login Page</h2>
      username:
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      password:
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="submit" onClick={loginUser}>
        login
      </button>
      <p>
        Don&apos;t have an account?
        <Link to="/signup">Signup</Link>
      </p>
    </div>
  )
}

export default Login
