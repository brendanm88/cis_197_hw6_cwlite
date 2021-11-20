import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import axios from 'axios'

import Modal from './Modal'
import Question from './Question'

const Home = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [answer, setAnswer] = useState('')
  const [modal, setModal] = useState(false)
  const [questions, setQuestions] = useState([])

  const showModal = () => {
    setModal(!modal)
  }
  // fix this so it shows up immediately after refresh!
  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data } = await axios.get('/api/questions') // GET request
      setQuestions(data)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  // fix window alert here ************************************????
  useEffect(async () => {
    try {
      const { data } = await axios.post('/account/isLoggedIn', { username, password })
      if (data !== 'Error: user not authenticated') {
        setUsername(data)
      } else {
        setUsername('')
      }
    } catch (err) {
      setUsername('')
      // console.log('user not logged in')
    }
  }, [])

  const logoutUser = async () => {
    try {
      const { data } = await axios.post('/account/logout', { username, password })
      if (data === 'user is logged out') {
        setUsername('')
      }
    } catch (err) {
      // throw alert!
      window.alert('user logout has problems')
    }
  }

  if (username !== '') {
    return (
      <div>
        <h2>Home Page</h2>
        <h3>
          Hello &nbsp;
          {username}
          !
        </h3>
        <button type="submit" onClick={logoutUser}>
          logout
        </button>
        <br />
        <br />
        <br />
        <button type="submit" onClick={() => setModal(true)}>
          Add new Question +
        </button>
        <Modal show={modal} author={username} onClose={showModal} />
        {/* NEED TO MAKE MODAL SHOW UP WITH NEW QUESTION TEXT********************
        password:
        <input onChange={e => setPassword(e.target.value)} />
        <br />
        <button type="submit" onClick={loginUser}>
          Post
        </button> */}
        <>
          {/* MAKE INDIVIDUAL QUESTION COMPONENT??? ****************************** */}
          {questions.map(q => (
            <div key={q._id}>
              <Question question={q} />
            </div>
          ))}
        </>
      </div>
    )
  }
  return (
    <div>
      <h2>Home Page</h2>
      <Link to="/login">Login to submit or answer a question!</Link>
      <br />
      <>
        {questions.map(q => (
          <div key={q._id}>
            <h4>{q.questionText}</h4>
            <p>
              Author:
              <br />
              {q.author}
            </p>
            <p>
              Answer:
              <br />
              {q.answer}
            </p>
          </div>
        ))}
      </>
    </div>
  )
}

export default Home
