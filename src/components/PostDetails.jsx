import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";

const baseUrl = "https://back-nodejs-anderson.herokuapp.com"





const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    axios.get(`${baseUrl}/posts/id/${id}`).then((result) => {
      setPost(result.data);
    });
  }, [id]);

  return (
    <div className="d-flex text-center mt-5">
      <Card className="m-auto" style={{ width: "40rem" }}>
        <Card.Body>
          <Card.Title>
            <h5>TITULO:</h5>
            {post?.title}

            <br />
            <small>{post?.author}</small>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <br />
          <img
            style={{ maxWidth: "5rem", maxHeight: "5rem" }}
            src={post?.cloudinary_url}
            alt="imagen de chistes gallegos"
          />
          <Card.Text>{post?.body}</Card.Text>
          <br />
          <Link to={`/posts`} className="btn btn-primary">
            cerrar <i className="fa "></i>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostDetails;
