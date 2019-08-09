import ReceiptActionTypes from './actiontypes/receipttype';

export const showModal = ({ modalProps, modalType }) => dispatch => {
  dispatch({
    type: ReceiptActionTypes.SHOW_MODAL,
    modalProps,
    modalType
  });
}

export const hideModal = () => dispatch => {
  dispatch({
    type: ReceiptActionTypes.HIDE_MODAL
  });
}