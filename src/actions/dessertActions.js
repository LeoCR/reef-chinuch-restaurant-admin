import { SHOW_DESSERTS,DELETE_DESSERT,ADD_DESSERT, SHOW_DESSERT,EDIT_DESSERT} from "../constants/dessertTypes";
import api from '../api/api';
export  const getDesserts=()=>async dispatch=>{
    const response = await api.get('/api/get/desserts');
    dispatch({
        type:SHOW_DESSERTS,
        payload:response.data
    })
}
export const deleteDessert =id=>async dispatch=>{
    await api.delete(`/api/dish/delete/${id}`);
    dispatch({
        type:DELETE_DESSERT,
        payload:id
    })
}
export const addDessert=dessert=>async dispatch=>{
    const response = await api.post('/api/dish/add/',dessert,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    dispatch({
        type:ADD_DESSERT,
        payload:response.data
    })
}
export const showDessert=id=>async dispatch=>{
    const response=await api.get(`/api/dish/show/${id}`);
    dispatch({
        type:SHOW_DESSERT,
        payload:response.data
    })
}

export const editDessert=(dessert,id)=>async dispatch=>{
    const response = await api.put(`/api/dish/update/${id}`,dessert)
    .then((res)=>{
        console.log('Response dessertActions.editDessert()');
        console.log(res);
    })
    .catch((err)=>{
        console.log('An error occurs in dessertActions.editDessert');
        console.log(err);
    });
    dispatch({
        type:EDIT_DESSERT,
        payload:response.data
    })
}
export const updateDessert=(dessert,id)=>async dispatch=>{
    const response = await api.put(`/api/dish/update-img/${id}`,dessert,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then((res)=>{
        console.log('Response dessertActions.updateDessert()');
        console.log(res);
    })
    .catch((err)=>{
        console.log('An error occurs in dessertActions.updateDessert');
        console.log(err);
    });
    dispatch({
        type:EDIT_DESSERT,
        payload:response.data
    })
}