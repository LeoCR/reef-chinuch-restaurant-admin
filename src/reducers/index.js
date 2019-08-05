import {combineReducers} from "redux";
import ingredientsReducer from "./ingredientsReducer";
import drinksReducer from "./drinksReducer";
//import invoicesReducer from "./invoicesReducer";
import modalsReducer from "./modalsReducer";
import ingredientByDishReducer from "./ingredientByDishReducer"
//import usersReducer from "./usersReducer";
export default combineReducers({
    ingredients:ingredientsReducer,
    drinks:drinksReducer,
    //invoices:invoicesReducer,
    modals:modalsReducer,
    ingredientsByDish:ingredientByDishReducer,
    //users:usersReducer
});