import React, { Component } from 'react';
import Header from "../components/Header";
import AddIngredient from "../components/add/AddIngredient";
import AddDrink from "../components/add/AddDrink";
import AddUser from '../components/add/AddUser';
import AddMainCourse from "../components/add/AddMainCourse";
import ShowIngredients from "./show/ShowIngredients";
import ShowDrinks from "./show/ShowDrinks";
import ShowUsers from "./show/ShowUsers";
import ShowMainCourses from './show/ShowMainCourses';
import EditIngredient from "../components/edit/EditIngredient";
import EditDrink from "../components/edit/EditDrink";
import EditUser from '../components/edit/EditUser';
import EditMainCourse from '../components/edit/EditMainCourse';
import {Router,Route,Switch} from "react-router-dom";
import history from '../history';
import Modal from "../components/Modal";
class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Router history={history}>
            <React.Fragment>
                <Header/>
                <div className="container">
                  <Switch>
                      <Route exact path="/admin/" 
                      render={() => <ShowIngredients/>}
                      />
                      <Route exact path="/admin/ingredients" render={() => <ShowIngredients/>} />
                      <Route exact path="/admin/ingredients/:page" component={ShowIngredients} />
                      <Route exact path="/admin/add/ingredient" component={AddIngredient}/>
                      <Route exact path="/admin/edit/ingredient/:id" component={EditIngredient}/>

                      <Route exact path="/admin/main-courses" component={ShowMainCourses}/>
                      <Route exact path="/admin/main-courses/:page" component={ShowMainCourses}/>
                      <Route exact path="/admin/add/main-course" component={AddMainCourse}/>
                      <Route exact path="/admin/edit/main-course/:id" component={EditMainCourse}/>

                      <Route exact path="/admin/drinks" render={() => <ShowDrinks/>}/>
                      <Route exact path="/admin/drinks/:page" component={ShowDrinks}/>
                      <Route exact path="/admin/add/drink" component={AddDrink}/>
                      <Route exact path="/admin/edit/drink/:id" component={EditDrink}/>

                      <Route exact path="/admin/users" component={ShowUsers}/>
                      <Route exact path="/admin/users/:page" component={ShowUsers}/>
                      <Route exact path="/admin/edit/user/:id" component={EditUser}/>
                      <Route exact path="/admin/add/user" component={AddUser}/>
                  </Switch>  
                </div>
            </React.Fragment>
          </Router>
          <Modal/>
      </React.Fragment>
    );
  }
}

export default App
