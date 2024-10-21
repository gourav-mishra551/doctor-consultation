import { GET_DATA_BY_ID } from "./ActionType"

const initialState = {
    doctorsData: []
}

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_DATA_BY_ID:
            return { ...state, doctorsData: payload }
        default: return state
    }
}

export default reducer