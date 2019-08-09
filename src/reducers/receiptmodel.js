import ReceiptActionTypes from '../actions/actiontypes/receipttype';

const initialState = {
  modalType: null,
  modalProps: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ReceiptActionTypes.SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type
      }
    case ReceiptActionTypes.HIDE_MODAL:
      return initialState
    default:
      return state
  }
}