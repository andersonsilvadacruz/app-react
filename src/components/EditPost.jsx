import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

const baseUrl = "https://back-nodejs-anderson.herokuapp.com"



const EditPost = (props) => {
  const { id } = useParams();
  const { register, handleSubmit, errors, setValue } = useForm();
  const [prevImage, setPrevImage] = useState(null);
  const [fileData, setFileData] = useState(null);

  //--traigo lo que esta nel el form por id---//
  useEffect(() => {
    axios.get(`${baseUrl}/posts/id/${id}`).then((result) => {
      setValue("_id", result.data._id); //tomo valores de la consulta
      setValue("title", result.data.title);
      setValue("body", result.data.body);
      console.log(result.data);

      setPrevImage(result.data.cloudinary_url); //imagen original
    });
  }, [id, setValue]);
  //trae datos del campo imagen
  const handleChange = () => (e) => {
    const value = e.target.files[0];
    setFileData(value);
  };
  //toma datos de todo el form
  const onSubmit = (data) => {
    const formData = new FormData();
    //puede elegir cambien o no una imagen en este IF si el imput de foto esta vacio
    if (fileData === null) {
      formData.append("title", data.title);
      formData.append("body", data.body);
    } else {
      formData.append("file", fileData);
      formData.append("title", data.title);
      formData.append("body", data.body);
    }

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .patch(`${baseUrl}/posts/patch/${id}`, formData, config)
      .then((result) => {
        props.history.push("/posts");
        swal("POST editado", result.statusText, "success");
      })
      .catch(function (error) {
        if (error.response) {
          swal(error.response.data.error, "", "error");
        }
      });
  };

  return (
    <div
      className="container   mt-5"
      style={{ maxWidth: "40rem", maxHeight: "50rem" }}
    >
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Editar post</h5>
          <div className="card-text">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Título</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  name="title"
                  ref={register({ required: false })}
                />
                <small className="form-text text-danger">
                  {errors.title && "Título inválido"}
                </small>
              </div>
              <div className="form-group">
                <label>ID</label>

                <input
                  readOnly
                  type="text"
                  className="form-control"
                  name="_id"
                  ref={register({ required: false })}
                />
              </div>

              <div className="form-group">
                <label>Imagen</label>

                <div className="container text-center mb-3">
                
                  <img
                   
                    style={{ maxWidth: "5rem", maxHeight: "5rem" }}
                    type="image"
                    name="prevImage"
                    src={prevImage}
                    onChange={handleChange("image")}
                    alt="prevImage"
                  />
                </div>

                <input
                  name="file"
                  type="file"
                  onChange={handleChange("file")}
                  ref={register({ required: false })}
                  className="form-control"
                />

                <small className="form-text text-danger">
                  {errors.file && "Debe cargar una imagen"}
                </small>
              </div>

              <div className="form-group">
                <label>Conteúdo</label>
                <textarea
                  name="body"
                  cols="30"
                  rows="5"
                  className="form-control"
                  ref={register({ required: true })}
                ></textarea>
                <small className="form-text text-danger">
                  {errors.body && "Conteúdo inválido"}
                </small>
              </div>
              <Link to="/posts" className="btn btn-primary">
                <i className="fa fa-arrow-left"></i> Cancelar
              </Link>

              <button type="submit" className="btn btn-success ml-2">
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost 
