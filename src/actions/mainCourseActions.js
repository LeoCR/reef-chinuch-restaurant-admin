import { SHOW_MAIN_COURSES,DELETE_MAIN_COURSE,ADD_MAIN_COURSE, 
    SHOW_MAIN_COURSE, EDIT_MAIN_COURSE} from "../constants/mainCourseTypes"
import api from '../api/api';
export  const getMainCourses=()=>async dispatch=>{
    const response = await api.get('/api/get/main-courses')
    .catch((err)=>{
        console.log('An error occurs in mainCourseActions.getMainCourses');
        console.log(err);
    });
    dispatch({
        type:SHOW_MAIN_COURSES,
        payload:response.data
    })
}
export const deleteMainCourse =id=>async dispatch=>{
    await api.delete(`/api/dish/delete/${id}`)
    .catch((err)=>{
        console.log('An error occurs in mainCourseActions.deleteMainCourse');
        console.log(err);
    });
    dispatch({
        type:DELETE_MAIN_COURSE,
        payload:id
    })
}
export const addMainCourse=mainCourse=>async dispatch=>{
    const response = await api.post('/api/dish/add/',mainCourse,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .catch((err)=>{
        console.log('An error occurs in mainCourseActions.addMainCourse');
        console.log(err);
    });
    dispatch({
        type:ADD_MAIN_COURSE,
        payload:response.data
    })
}
export const showMainCourse=id=>async dispatch=>{
    const response=await api.get(`/api/dish/show/${id}`)
    .catch((err)=>{
        console.log('An error occurs in mainCourseActions.showMainCourse');
        console.log(err);
    });
    dispatch({
        type:SHOW_MAIN_COURSE,
        payload:response.data
    })
}

export const editMainCourse=(mainCourse,id)=>async dispatch=>{
    const response = await api.put(`/api/dish/update/${id}`,mainCourse)
    .then((res)=>{
        console.log('Response mainCourseActions.editMainCourse');
        console.log(res);
    })
    .catch((err)=>{
        console.log('An error occurs in mainCourseActions.editMainCourse');
        console.log(err);
    });
    dispatch({
        type:EDIT_MAIN_COURSE,
        payload:response.data
    })
}
export const updateMainCourse=(mainCourse,id)=>async dispatch=>{
    const response = await api.put(`/api/dish/update-img/${id}`,mainCourse,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then((res)=>{
        console.log('Response mainCourseActions.updateMainCourse');
        console.log(res);
    })
    .catch((err)=>{
        console.log('An error occurs in mainCourseActions.updateMainCourse');
        console.log(err);
    });
    dispatch({
        type:EDIT_MAIN_COURSE,
        payload:response.data
    })
}