import React,{useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const baseUrl = "https://back-nodejs-anderson.herokuapp.com"


const CreatePost = (props) => {
 



  const { register, handleSubmit, errors } = useForm();
  const [fileData, setFileData] = useState(null);
  
  const handleChange = () => (e) => {
    const value =  e.target.files[0] 
    setFileData( value );
    
  };
  const onSubmit = async (body) => {
   

    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("title", body.title);
    formData.append("body", body.body);
   

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    await axios
      .post(`${baseUrl}/posts/create`, formData, config)
      .then((result) => {
        props.history.push("/posts");
        //respuesta "ok" server
       
        swal("POST creado", result.statusText, "success");
      })
      .catch(function (error) {
        if (error.response) {
       
       

          swal(error.response.data.error, "", "error");
        }
      });
  };

  return (
    <div className="container   mt-5" style={{ maxWidth: "40rem",maxHeight:"50rem" }}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Nuevo Post</h5>
          <div className="card-text">
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <label>Título</label>
                <input
                autoFocus
                
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
                <label>Imagen</label>
                <input
                  name="file"
                  type="file"
                  onChange={handleChange("file")}
                  ref={register({ required: true })}
                  className="form-control"
                
                />
                <small className="form-text text-danger">
                  {errors.file && "Debe cargar una imagen"}
                </small>
              </div>

              <div className="form-group">
                <label>Contenido</label>
                <textarea
                  name="body"
                  cols="30"
                  rows="10"
                  className="form-control"
                  ref={register({ required: false })}
                ></textarea>
                <small className="form-text text-danger">
                  {errors.body && "Contenido inválido"}
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

export default CreatePost;
