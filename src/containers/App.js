import React, { Component } from 'react';
import Header from "../components/Header";
import AddIngredient from "../components/add/AddIngredient";
import ShowIngredients from "./show/ShowIngredients";
import EditIngredient from "../components/edit/EditIngredient";
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
