import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idModal, setIdModal] = useState(0);
  const router = useRouter()

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    axios.get('https://limitless-forest-49003.herokuapp.com/posts').then((res) => {
      setPosts(res.data.sort(function(a, b) { 
        return a.id - b.id;
      }));
    })
  }

  const deletePost = () => {
    axios.delete(`https://limitless-forest-49003.herokuapp.com/posts/${idModal}`).then(() => {
      setIsModalOpen(false);
      getAllPosts();
    })
  }

  const onClickCreate = () => {
    router.push('/post/create');
  }

  const onClickTable = (id) => {
    router.push(`/post/${id}`);
  }

  const onClickEdit = (id) => {
    router.push(`/post/edit/${id}`);
  }

  const onClickDelete = (id) => {
    setIdModal(id);
    setIsModalOpen(true);
  }
  
  const renderTable = () => {
    return posts.map((el, index) => {
      return (
        <tr
          key={index}
        >
          <th 
           scope="row"
           onClick={() => onClickTable(el.id)}
           style={{cursor: "pointer"}}
          >
            {el.id}
          </th>
          <td 
            onClick={() => onClickTable(el.id)} 
            style={{cursor: "pointer"}}
          >
            {el.title}
          </td>
          <td
            onClick={() => onClickTable(el.id)}
            style={{cursor: "pointer"}}
          >
            {el.content}
          </td>
          <td 
            onClick={() => onClickTable(el.id)}
            style={{cursor: "pointer"}}
          >
            {moment(el.published_at).format('DD MMM YYYY HH:mm:ss')}
          </td>
          <td 
            onClick={() => onClickTable(el.id)}
            style={{cursor: "pointer"}}
          >  
            {moment(el.created_at).format('DD MMM YYYY HH:mm:ss')}
          </td>
          <td
            onClick={() => onClickTable(el.id)}
            style={{cursor: "pointer"}}
          >
            {moment(el.updated_at).format('DD MMM YYYY HH:mm:ss')}
          </td>
          <td>
            <Button
              color="primary"
              className="me-2"
              onClick={() => onClickEdit(el.id)}
            >
              Edit
            </Button>
            <Button
              color="danger"
              onClick={() => onClickDelete(el.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      )
    })
  }

  return (
    <div>
      <Head>
        <title>Posts CRUD App</title>
        <meta name="description" content="Posts CRUD App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Row>
            <Col>
              <h1 className="text-center my-4">
                Posts CRUD App
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                color="success"
                className="mb-3"
                onClick={() => onClickCreate()}
              >
                Create Post
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered className="text-center">
                <thead>
                  <tr>
                    <th>
                      ID
                    </th>
                    <th>
                      Title
                    </th>
                    <th>
                      Content
                    </th>
                    <th>
                      Published At
                    </th>
                    <th>
                      Created At
                    </th>
                    <th>
                      Updated At
                    </th>
                    <th>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { posts.length > 0 
                    ? renderTable()
                    : null
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              { posts.length > 0 
                ? null
                : <div className="text-center mx-3">Please Wait...</div>
              }
            </Col>
          </Row>
        </Container>
        
        <Modal
          isOpen={isModalOpen}
        >
          <ModalHeader>
            Delete Confirmation
          </ModalHeader>
          <ModalBody>
            Are you sure want to delete this post?
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => {deletePost()}}
            >
              Delete
            </Button>
            <Button onClick={() => {setIsModalOpen(false)}}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </main>
    </div>
  )
}
