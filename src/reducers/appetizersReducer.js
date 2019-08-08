import { SHOW_APPETIZERS,DELETE_APPETIZER, 
    ADD_APPETIZER,SHOW_APPETIZER,EDIT_APPETIZER} from "../constants/appetizerTypes";
const initialState={
    appetizers:[]
}
export default function appetizersReducer(state=initialState,action){
    switch (action.type) {
        case SHOW_APPETIZERS:
            return{
                ...state,
                appetizers:action.payload
            }
        case DELETE_APPETIZER:
        return{
            ...state,
            appetizers:state.appetizers.filter(appetizer=>appetizer!==action.payload)
        }
        case ADD_APPETIZER:
            return{
                ...state,
                appetizers:[...state.appetizers,action.payload]
            }
        case SHOW_APPETIZER:
            return {
                ...state,
                appetizer:action.payload
            }
        case EDIT_APPETIZER:
            return{
                ...state,
                appetizers:state.appetizers.map(
                    appetizer=>appetizer.id===action.payload.id
                    ?(appetizer=action.payload)
                    :appetizer
                )
        }
        default:
            return state;
    }
}