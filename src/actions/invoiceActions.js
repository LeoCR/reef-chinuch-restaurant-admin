import {GET_INVOICES,SHOW_INVOICE,SHOW_ORDER_PRODUCTS,EDIT_INVOICE} from "../constants/invoicesTypes";
import api from '../api/api';
export const getInvoices=()=>async dispatch=>{
    const response = await api.get('/api/invoices/')
    dispatch({
        type:GET_INVOICES,
        payload:response.data
    })
}
export const showInvoice=orderCode=>async dispatch=>{
    const response=await api.get(`/api/invoice/show/${orderCode}`);
    dispatch({
        type:SHOW_INVOICE,
        payload:response.data
    })
}
export const showOrderProducts=orderCode=>async dispatch=>{
    const response=await api.get(`/api/invoice/show/products/${orderCode}`);
    dispatch({
        type:SHOW_ORDER_PRODUCTS,
        payload:response.data
    })
}
export const editInvoice=invoice=>async dispatch=>{
    const response = await api.put(`/api/invoice/update/${invoice.orderCode}`,invoice);
    dispatch({
        type:EDIT_INVOICE,
        payload:response.data
    })
}
