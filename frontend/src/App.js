import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import axios from 'axios'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Home from '../components/Home'

const App = () => {
  const [data, setData] = useState([])

  useEffect(async () => {
    const { data: users } = await axios.get('/account/all') // GET request
    setData(users)
  }, [])

  return (
    <Router>
      <>
        <br />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </>
    </Router>
  )
  // return (
  //   <>
  //     <h1>Your react app!</h1>
  //     <>
  //       {data.map(user => (
  //         <p key={user.username}>
  //           {user.username}
  //         </p>
  //       ))}
  //     </>
  //     username:
  //     <input onChange={e => setUsername(e.target.value)} />
  //     <br />
  //     password:
  //     <input onChange={e => setPassword(e.target.value)} />
  //     <br />
  //     <button type="submit" onClick={signupUser}>
  //       signup
  //     </button>
  //     <p>
  //       succeeded:
  //       {`${succeeded}`}
  //     </p>
  //   </>
  // )
}

export default App
