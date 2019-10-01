
export const expenseReducer = 
(state = { hasError: false, 
           isLoading: true, 
           expenses: [], 
           id: null, 
           comment: null, 
           receipts: [] }, 
        
           action) => {
    switch (action.type) {
        case '@expenses/ERROR':
            return {
                ...state,
                hasError: action.hasError
            }
        case '@expenses/LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        case '@expenses/FETCH_ALL_SUCCESS':
            return {
                ...state,
                expenses: action.expenses || []
            }
        case '@expenses/CREATE_COMMENT_SUCCESS': {
            const newExpenses = state.expenses.map((expense) => {
                return (expense.id !== action.id) ? expense : {
                    ...expense,
                    comment: action.comment
                }
            })
            return {
                ...state,
                expenses: newExpenses
            };
        }
        case '@expenses/UPLOAD_RECEIPTS_SUCCESS': {
            const newExpenses = state.expenses.map((expense) => {
                return (expense.id !== action.id) ? expense : {
                    ...expense,
                    receipts: expense.receipts.concat(action.receipts)
                }
            })
            return {
                ...state,
                expenses: newExpenses
            }; 
        }
        default:
            return state;
    }
}



// export function expensesHaveErrored(state = false, action) {
//     switch (action.type) {
//         case '@expenses/ERROR':
//             return action.hasErrored;
//         default:
//             return state;
//     }
// }
// export function expensesAreLoading(state = false, action) {
//     switch (action.type) {
//         case '@expenses/LOADING':
//             return action.isLoading;
//         default:
//             return state;
//     }
// }
// export function expenses(state = [], action) {

//     switch (action.type) {
//         case '@expenses/FETCH_ALL_SUCCESS':
//             return action.items.expenses;
//         default:
//             return state;
//     }
// }