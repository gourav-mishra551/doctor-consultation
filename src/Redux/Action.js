import axios from "axios"
import { GET_DATA_BY_ID } from "./ActionType"

const url = 'https://api.assetorix.com/ah/dctr_ctgry'

export const getDrDataById = (id) => async (dispatch) => {
    const response = await axios.get(`${url}/${id}`)
    dispatch({ type: GET_DATA_BY_ID, payload: response.data })
}
 

