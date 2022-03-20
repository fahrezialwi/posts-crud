import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios'
import React, { useState } from 'react';
import { Container, Row, Col, Table, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreatePost() {
  const router = useRouter();
  const [post, setPost] = useState({});
  
  const createPost = () => {
    axios.post('https://limitless-forest-49003.herokuapp.com/posts',
    {
      title: post.title,
      content: post.content,
    }).then(() => {
      router.push('/');
    })
  }

  return (
    <div>
      <Head>
        <title>Create Post</title>
        <meta name="description" content="Posts CRUD App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Row>
            <Col>
              <h1 className="text-center my-4">
                Create Post
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
            <Table striped bordered className="text-center">
              <tbody>
                <tr>
                  <th>Title</th>
                  <td>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      defaultValue={post.title}
                      onChange={(e) => {
                        setPost({ ...post, title: e.target.value });
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Content</th>
                  <td>
                    <Input
                      id="content"
                      name="content"
                      type="textarea"
                      defaultValue={post.content}
                      onChange={(e) => {
                        setPost({ ...post, content: e.target.value });
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button
                color="success"
                className="me-2"
                onClick={() => createPost()}
              >
                Create
              </Button>
              <Button
                color="secondary"
                onClick={() => router.back()}
              >
                Back
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  )
}
