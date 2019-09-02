export function expensesHaveErrored(state = false, action) {
    switch (action.type) {
        case 'EXPENSES_HAVE_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function expensesAreLoading(state = false, action) {
    switch (action.type) {
        case 'EXPENSES_ARE_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function expenses(state = [], action) {

    switch (action.type) {
        case 'EXPENSES_FETCH_DATA_SUCCESS':
            return action.items.expenses;
        default:
            return state;
    }
}