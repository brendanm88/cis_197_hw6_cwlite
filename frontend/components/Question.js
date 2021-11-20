import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Question = ({
  question,
}) => {
  const [content, setContent] = useState('')
  const [answering, setAnswering] = useState(false)
  const {
    _id,
    author,
    questionText,
    answer,
  } = question

  const addAnswer = async id => {
    if (content === '') {
      window.alert('empty answer!')
    } else {
      try {
        const { data } = await axios.post('/api/questions/answer', { id, answer: content })
        if (data === 'question answer updated') {
          // close answer
          setAnswering(false)
        }
      } catch (err) {
        // throw alert!
        window.alert('answering the question has problems')
      }
    }
  }

  if (!answering) {
    return (
      <>
        <h4>{questionText}</h4>
        <p>
          Author:
          <br />
          {author}
        </p>
        <p>
          Answer:
          <br />
          {answer}
        </p>
        <p>
          <button type="submit" onClick={() => setAnswering(!answering)}>
            Answer!
          </button>
        </p>
      </>
    )
  }
  return (
    <>
      <h4>{questionText}</h4>
      <p>
        Author:
        <br />
        {author}
      </p>
      <p>
        Answer:
        <br />
        {answer}
      </p>
      <p>
        Answer this question:
        <input onChange={e => setContent(e.target.value)} />
        <br />
        <button type="submit" onClick={() => addAnswer(_id)}>
          Submit answer
        </button>
      </p>
    </>
  )
}

export default Question
