import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Input, Button } from 'reactstrap';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});

  useEffect(() => {
    if (id) {
      getDetailPost(id);
    }
  }, [id])

  const getDetailPost = (id) => {
    axios.get(`https://limitless-forest-49003.herokuapp.com/posts/${id}`).then((res) => {
      setPost(res.data);
    })
  }

  const editPost = (id) => {
    axios.put(`https://limitless-forest-49003.herokuapp.com/posts/${id}`,
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
        <title>Edit Post ID {id}</title>
        <meta name="description" content="Posts CRUD App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Row>
            <Col>
              <h1 className="text-center my-4">
                Edit Post ID {id}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
            <Table striped bordered className="text-center">
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>
                    {id}
                  </td>
                </tr>
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
                <tr>
                  <th>Published At</th>
                  <td>
                    {
                      post.published_at ? moment(post.published_at).format('DD MMM YYYY HH:mm:ss') : '-'
                    }
                  </td>
                </tr>
                <tr>
                  <th>Created At</th>
                  <td>
                    {
                      post.created_at ? moment(post.created_at).format('DD MMM YYYY HH:mm:ss') : '-'
                    }
                  </td>
                </tr>
                <tr>
                  <th>Updated At</th>
                  <td>
                    {
                      post.updated_at ? moment(post.updated_at).format('DD MMM YYYY HH:mm:ss') : '-'
                    }
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
                onClick={() => editPost(id)}
              >
                Edit
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
