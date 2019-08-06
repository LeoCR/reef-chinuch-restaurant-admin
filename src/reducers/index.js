import {combineReducers} from "redux";
import ingredientsReducer from "./ingredientsReducer";
import drinksReducer from "./drinksReducer";
//import invoicesReducer from "./invoicesReducer";
import modalsReducer from "./modalsReducer";
import ingredientByDishReducer from "./ingredientByDishReducer"
import usersReducer from "./usersReducer";
import mainCoursesReducer from "./mainCoursesReducer";
export default combineReducers({
    ingredients:ingredientsReducer,
    drinks:drinksReducer,
    //invoices:invoicesReducer,
    mainCourses:mainCoursesReducer,
    modals:modalsReducer,
    ingredientsByDish:ingredientByDishReducer,
    users:usersReducer
});