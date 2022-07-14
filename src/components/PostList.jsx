import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import "../cssPostList.css";

const baseUrl = "https://back-nodejs-anderson.herokuapp.com";

////mando el toquen que esta en localStorage A headers para que persista la autenticacion
///https://www.tutorialspoint.com/reactjs-axios-interceptors
axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${window.localStorage.getItem(
      "token"
    )}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/////TRAE DATOS////
const PostList = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/posts`)
      .then((result) => {
        setPosts(result.data);
      })
      .catch(function (error) {
        if (error.response) {
          swal(error.response.data.message);

          setTimeout(props.history.push("/"), 3000);
        }
      });
  }, [props.history]);

  //////BUSQUEDA////////

  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticionGet = async () => {
    await axios
      .get(`${baseUrl}/posts`)
      .then((response) => {
        setPosts(response.data);
        setTablaUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    // eslint-disable-next-line array-callback-return
    var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (elemento.title.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) 
      {
        return elemento;
      }
    });
    setPosts(resultadosBusqueda);
  };

  ////busqueda////
  useEffect(() => {
    peticionGet();
  }, []);

  ////LOGAUT////
  const borarToken = () => {
    window.localStorage.clear("token");
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div className=" navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink
                className="nav-link"
                activeStyle={{ fontWeight: "bold" }}
                to="/posts"
                exact
              >
                Posts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeStyle={{ fontWeight: "bold" }}
                to="/posts/create"
              >
                Nuevo post
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container text-center ">
        <NavLink
          to="/"
          type="botton"
          onClick={borarToken}
          className="btn btn-danger m-2"
        >
          Logaut{" "}
        </NavLink>

        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por TITULO"
          onChange={handleChange}
          //to={`/posts/${posts.title}`}
        />
      </div>
      <br />
      <div className="table-responsive">
        <table className="table ">
          <thead className="container">
            <tr>
              <th className="text-center">Titulo</th>

              <th className="text-center">Foto</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>

                <td>
                  <img
                    style={{
                      borderRadius: "80%",
                      maxWidth: "5rem",
                      maxHeight: "5rem",
                    }}
                    src={post.cloudinary_url}
                    alt="imagen de chistes gallegos"
                  />
                </td>

                <td className="text-center ">
                  <div className="btn-group ">
                    <Link
                      to={`/posts/edit/${post._id}`}
                      className="btn btn-primary"
                    >
                      <i className="fa fa-edit"></i>
                    </Link>
                    <Link
                      to={`/posts/details/${post._id}`}
                      className="btn btn-secondary"
                    >
                      <i className="fa fa-eye"></i>
                    </Link>
                    <Link
                      to={`/posts/delete/${post._id}`}
                      className="btn btn-danger"
                    >
                      <i className="fa fa-trash"></i>
                    </Link>
                  </div>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostList;
