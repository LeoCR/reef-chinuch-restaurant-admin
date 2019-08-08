import {combineReducers} from "redux";
import ingredientsReducer from "./ingredientsReducer";
import drinksReducer from "./drinksReducer";
//import invoicesReducer from "./invoicesReducer";
import dessertsReducer from "./dessertsReducer";
import modalsReducer from "./modalsReducer";
import ingredientByDishReducer from "./ingredientByDishReducer"
import usersReducer from "./usersReducer";
import mainCoursesReducer from "./mainCoursesReducer";
import appetizersReducer from "./appetizersReducer";
export default combineReducers({
    ingredients:ingredientsReducer,
    drinks:drinksReducer,
    //invoices:invoicesReducer,
    appetizers:appetizersReducer,
    desserts:dessertsReducer,
    mainCourses:mainCoursesReducer,
    modals:modalsReducer,
    ingredientsByDish:ingredientByDishReducer,
    users:usersReducer
});