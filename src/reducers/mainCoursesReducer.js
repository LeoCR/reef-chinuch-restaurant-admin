import { EDIT_MAIN_COURSE,SHOW_MAIN_COURSES, 
    DELETE_MAIN_COURSE,ADD_MAIN_COURSE,
    SHOW_MAIN_COURSE } from "../constants/mainCourseTypes";
const initialState={
    mainCourses:[]
}
export default function mainCoursesReducer(state=initialState,action){
    switch (action.type) {
        case SHOW_MAIN_COURSES:
            return{
                ...state,
                mainCourses:action.payload
            }
        case DELETE_MAIN_COURSE:
        return{
            ...state,
            mainCourses:state.mainCourses.filter(mainCourse=>mainCourse!==action.payload)
        }
        case ADD_MAIN_COURSE:
            return{
                ...state,
                mainCourses:[...state.mainCourses,action.payload]
            }
        case SHOW_MAIN_COURSE:
            return {
                ...state,
                mainCourse:action.payload
            }
        case EDIT_MAIN_COURSE:
            return{
                ...state,
                mainCourses:state.mainCourses.map(
                    mainCourse=>mainCourse.id===action.payload.id
                    ?(mainCourse=action.payload)
                    :mainCourse
                )
        }
        default:
            return state;
    }
}