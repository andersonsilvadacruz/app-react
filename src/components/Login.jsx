import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import Register from "./Register";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const baseUrl = "https://back-nodejs-anderson.herokuapp.com"




const Login = (props) => {
  const { handleSubmit, register } = useForm();

  ///////GUARDA TOKEN EN LOCALSTORAGE/////
  const [, setToken] = useState(window.localStorage.getItem("token"));

  const setLocalStore = (value) => {
    try {
      setToken(value);
      window.localStorage.setItem("token", value);
    } catch (error) {
      console.error(error);
    }
  };

  ///////DATA DEL FORMULARIO/////
  function onSubmit(data) {
    axios
      .post(`${baseUrl}/customers/login`, data)
      .then((result) => {
        setLocalStore(result.data.token);

        props.history.push("/posts");

        //REGIRIGE A CRUD POSTS/////
        ///https://codesource.io/how-to-use-this-props-history-push-on-your-react-project/

        //respuesta "ok" server
        swal("LOGIN", result.statusText, "success");
      })
      .catch(function (error) {
        if (error.response) {
          swal(error.response.data.error, "", "error");
        }
      });
  }

  return (
    <div className="container   mt-5" style={{ maxWidth: "40rem" }} >
      <h1 className="text-center mb-5">CHISTONTOS</h1>
      <div className="  mr-auto  ">

        <div className="card ">
        <div className="m-auto mt-2   " style={{ width: "6rem" }}  >
        <Link to="/customers/register"  component={Register}> Registo</Link>
      </div>
          
          <div className="card-body ">
            <h5 className="card-title">Login</h5>
            <div className="card-text  ">
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

                <button type="submit" className="btn btn-success  ">
                  Login
                </button>

              </form>


            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
};
export default Login;
