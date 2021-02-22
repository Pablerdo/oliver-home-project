import React, { useState} from 'react';
import '../Styles/Home.scss';
import axios from 'axios';
import { Rating, Modal, Button, Form} from 'semantic-ui-react'


const Add = (props) => {

  const [author, setAuthor] = useState(() => '')
  const [headline, setHeadline] = useState(() => '')
  const [description, setDescription] = useState(() => '')
  const [open, setOpen] = useState(() => false)
  const [starRating, setStarRating] = useState(() => 0)

  const onChange = (e, data) => {
    switch(data.name){
      case "author":
        setAuthor(data.value)
        break
      case "headline":
        setHeadline(data.value)
        break
      case "description":
        setDescription(data.value)
        break
      case "starRating":
        setStarRating(data.rating)
        break
      default:
        console.error("Invalid")
    }
  }

  const postReview = (event) => {
    event.preventDefault()

    axios.post('http://localhost:3004/reviews', {
      "author": author,
      "star_rating": starRating,
      "headline": headline,
      "body": description,
      "productId": props.givenProduct,
    }).then((response) => {
      props.onSubmit()
      console.log(response)
    }, (error) => {
      console.log(error)
    })

    onClose()
  } 
  
  const onClose = () => {
    setOpen(false)
    setAuthor('')
    setHeadline('')
    setDescription('')
    setStarRating(0)
  }
  
  const isInvalid = author === '' || headline === '' || description === '' || starRating === 0

  return (
    <Modal
      onClose={onClose}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button secondary size='huge' style={{marginTop: 45}} floated='right'>Write review</Button>}
    >
      <Modal.Header>Write a Review</Modal.Header>
      <Modal.Content >
        <Modal.Description>
          <Form>
            <Form.Input
              required
              name="author"
              value={author}
              onChange={onChange}
              type="text"
              label="Author"
              maxLength={50}
            />
            <Form.Input
              required
              name="headline"
              value={headline}
              onChange={onChange}
              type="text"
              label="Headline"
              maxLength={70}
            />
            <Rating 
              icon='heart' 
              size='massive' 
              name='starRating'
              onRate={onChange} 
              required 
              defaultRating={starRating}
              maxRating={5} 
              style={{marginBottom: 10}}
            />

            <Form.TextArea
              required
              name="description"
              value={description}
              onChange={onChange}
              type="text"
              label="Description"
              maxLength={300}
            />

          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={isInvalid}
          content="Accept"
          labelPosition='right'
          icon='checkmark'
          onClick={e => postReview(e)}
          style={{backgroundColor: '#ffe82f', fontColor: 'black'}}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default Add