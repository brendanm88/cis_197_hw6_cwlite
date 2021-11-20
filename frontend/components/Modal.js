import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Modal = ({
  show,
  author,
  onClose,
}) => {
  const [content, setContent] = useState('')

  const addQuestion = async () => {
    if (content === '') {
      window.alert('empty question!')
    } else {
      try {
        const { data } = await axios.post('/api/questions/add', { questionText: content, author })
        if (data === 'question created') {
          // close modal
          onClose()
        }
      } catch (err) {
        // throw alert!
        window.alert('adding a question has problems')
      }
    }
  }

  if (!show) {
    return null
  }
  return (
    <div>
      <h3>Post a question!</h3>
      <input onChange={e => setContent(e.target.value)} />
      <button
        type="submit"
        onClick={() => addQuestion()}
      >
        Submit
      </button>
      <button
        type="submit"
        onClick={() => onClose()}
      >
        Cancel
      </button>
    </div>
  )
}

export default Modal
