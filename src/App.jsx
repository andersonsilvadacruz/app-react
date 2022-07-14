import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import borrarToken from "./components/Logaut";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
import DeletePost from "./components/DeletePost";
import EditPost from "./components/EditPost";
import Login from "./components/Login";
import Register from "./components/Register";
import NoFont from "./components/NoFont";

const App = () => {
  

  
  return (
    <BrowserRouter>
    
      <div className=" container  ">
        <br />
        <Switch>
      
        <Route path="/" exact component={Login}></Route>
        

        <Route path="/posts" exact component={PostList}></Route>
        <Route path="/customers/register" exact component={Register}></Route>

        <Route path="/posts/create" exact component={CreatePost}></Route>
        <Route path="/posts/details/:id" exact component={PostDetails}></Route>
        <Route path="/posts/delete/:id" exact component={DeletePost}></Route>
        <Route path="/posts/edit/:id" exact component={EditPost}></Route>
        <Route   component={NoFont}></Route>
        </Switch>
       
              </div>
             
    </BrowserRouter>
  );
};

export default App;
