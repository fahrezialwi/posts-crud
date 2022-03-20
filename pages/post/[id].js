import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DetailPost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState([]);

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

  return (
    <div>
      <Head>
        <title>Detail Post ID {id}</title>
        <meta name="description" content="Posts CRUD App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Row>
            <Col>
              <h1 className="text-center my-4">
                Detail Post ID {id}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
            <Table striped bordered className="text-center">
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{post.id}</td>
                </tr>
                <tr>
                  <th>Title</th>
                  <td>{post.title}</td>
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
