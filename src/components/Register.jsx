import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

const baseUrl = "https://back-nodejs-anderson.herokuapp.com"


const Register = (props) => {
  const { handleSubmit, register } = useForm();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onSubmit(data) {
    axios
      .post(`${baseUrl}/customers/registro`, data)
      .then((result) => {
        if (swal("REGISTRO", result.data.message, "success")) {
          handleClose();
        }
        props.history.push("/");
      })
      .catch(function (error) {
        if (error.response) {
          swal(error.response.data.error, "", "error");
        }
      });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Registrate
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registo a APP</Modal.Title>
        </Modal.Header>
        <div>
          <div className="card">
            <div className="card-body">
              <div className="card-text">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                    autoFocus
                      type="text"
                      className="form-control"
                      ref={register({ required: false })}
                      name="email"
                    />
                    <small className="form-text text-danger"></small>
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      ref={register({ required: false })}
                      className="form-control"
                    ></input>
                    <small className="form-text text-danger"></small>
                  </div>

                  <button type="submit" className="btn btn-primary ">
                    Gurdar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Register;
