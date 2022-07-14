import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import swal from "sweetalert";

const baseUrl = "https://back-nodejs-anderson.herokuapp.com"

const DeletePost = (props) => {
  const { id } = useParams();
  const [post, setPost] = useState();

  //---TRAE POR ID---//
  useEffect(() => {
    axios.get(`${baseUrl}/posts/id/${id}`).then((result) => {
      setPost(result.data);
    });
  }, [id]);


//---BORRA POR ID---//
  const handleRemovePost = () => {
    axios
      .delete(`${baseUrl}/posts/delete/${id}`)
      .then((result) => {
        props.history.push("/posts");

        swal("BORRADO", result.statusText, "warning");
      })
      .catch(function (error) {
        if (error.response) {
          swal(error.response.data.error, "");
        }
      });
  };

  return (
    <div className="d-flex text-center mt-5">
      <Card className="m-auto" style={{ width: "40rem" }}>
        <Card.Body>
          <Card.Title>ESTA SEGURO DE ELIMINAR ESTE TITULO? </Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <br />
          <Card.Text>
            <strong>{post?.title}</strong>
          </Card.Text>
          
          <br />
          <Link to="/posts" className="btn btn-primary">
            <i className="fa fa-arrow-left"></i> Cancelar
          </Link>
          <button onClick={handleRemovePost} className="btn btn-danger ml-3">
            Eliminar <i className="fa fa-trash"></i>
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DeletePost;
