import { SHOW_APPETIZERS,DELETE_APPETIZER, 
    ADD_APPETIZER,SHOW_APPETIZER,EDIT_APPETIZER} from "../constants/appetizerTypes";
import api from '../api/api';
export  const getAppetizers=()=>async dispatch=>{
    const response = await api.get('/api/get/appetizers');
    dispatch({
        type:SHOW_APPETIZERS,
        payload:response.data
    })
}
export const deleteAppetizer =id=>async dispatch=>{
    await api.delete(`/api/dish/delete/${id}`);
    dispatch({
        type:DELETE_APPETIZER,
        payload:id
    })
}
export const showAppetizer=id=>async dispatch=>{
    const response=await api.get(`/api/dish/show/${id}`);
    dispatch({
        type:SHOW_APPETIZER,
        payload:response.data
    })
}
export const addAppetizer=appetizer=>async dispatch=>{
    const response = await api.post('/api/dish/add/',appetizer,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    dispatch({
        type:ADD_APPETIZER,
        payload:response.data
    })
}
export const editAppetizer=(appetizer,id)=>async dispatch=>{
    const response = await api.put(`/api/dish/update/${id}`,appetizer)
    .then((res)=>{
        console.log('Response appetizerActions.editAppetizer');
        console.log(res);
    })
    .catch((err)=>{
        console.log('An error occurs in appetizerActions.editAppetizer');
        console.log(err);
    });
    dispatch({
        type:EDIT_APPETIZER,
        payload:response.data
    })
}
export const updateAppetizer=(appetizer,id)=>async dispatch=>{
    const response = await api.put(`/api/dish/update-img/${id}`,appetizer,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then((res)=>{
        console.log('Response appetizerActions.updateAppetizer');
        console.log(res);
    })
    .catch((err)=>{
        console.log('An error occurs in appetizerActions.updateAppetizer');
        console.log(err);
    });
    dispatch({
        type:EDIT_APPETIZER,
        payload:response.data
    })
}