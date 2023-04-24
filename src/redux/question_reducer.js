import { createSlice } from "@reduxjs/toolkit"

export const questionReducer = createSlice({
    name : 'questions',
    initialState : {
        queue : [],
        answers : [],
        trace : 0
    },
    reducers : {
        startGameAction : (state, action) => {
            let {question, answers} = action.payload
            return {
                ...state,
                queue : question,
                answers
            }
        },
        moveNextAction : (state) => {
            return {
                ...state,
                trace : state.trace + 1
            }
        },
        movePrevAction : (state) => {
            return {
                ...state,
                trace : state.trace - 1
            }
        },
        resetAllAction: () => {
            return {
                queue : [],
                answers : [],
                trace : 0
            }
        }
    }
})

export const { startGameAction, moveNextAction, movePrevAction, resetAllAction } = questionReducer.actions;

export default questionReducer.reducer;