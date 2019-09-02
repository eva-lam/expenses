import axios from 'axios';
const {REACT_API_SERVER} = process.env;

export function expensesHaveErrored(bool) {
    return {
        type: 'EXPENSES_HAVE_ERRORED',
        hasErrored: bool
    };
}

export function expensesAreLoading(bool) {
    return {
        type: 'EXPENSES_ARE_LOADING',
        isLoading: bool
    };
}

export function expensesFetchDataSuccess(items) {
    console.log('this is items in action'+ items)
    return {
        type: 'EXPENSES_FETCH_DATA_SUCCESS',
        items
    };
}

export const createCommentSuccess =(id,comment)=>{
    return{
        type:'CREATE_COMMENT_SUCCESS',
        id,
        comment
    };
}

export const uploadReceiptsSuccess =(id,receipts)=>{
    return{
        type:'UPLOAD_RECEIPTS_SUCCESS',
        id,
        receipts
    }
}

export const getExpenses = (limit=25,offset=25)=> async(dispatch) => {
    try{
        dispatch(expensesAreLoading(true)); 
        const response = await axios.get(`${REACT_API_SERVER}/expenses?limit=${limit}&offset=${offset}`)
        if(response.status ===200){
            dispatch(expensesFetchDataSuccess(response.data))
            dispatch(expensesAreLoading(false)); 
        }else{
            throw new Error('FETCH_EXPENSES_FAILED')
        }
    }catch(e){
        dispatch(expensesHaveErrored(true))
    }

};

export const createComment=(id,comment)=>async(dispatch)=>{
    try {
        const response = await axios.post(`${REACT_API_SERVER}/expenses/${id}`,{comment})
    
        if(response.status===201){
            dispatch(createCommentSuccess(id,comment))
        }else{
            throw new Error('CREATE_COMMENT_FAILED')
        }
    }catch(e){
        dispatch(expensesHaveErrored(true))
    }
}; 

export const uploadReceipts =(id,files)=>async(dispatch)=>{
    try{
        const formData = new FormData()
        Array.from(files).map((file)=>formData.append('receipts', file))
        const response = await axios.post(`${REACT_API_SERVER}/expenses/${id}/`,formData)

        if(response.status === 201){
            const filePaths = response.data.filenames.map((name)=>`${REACT_API_SERVER}/${name}`)
            dispatch(uploadReceiptsSuccess(id,filePaths))
        }else{
            throw new Error('UPLOAD_RECEIPTS_FAILED')
        }
    }catch(e){
        console.error(e)
        dispatch(expensesHaveErrored(true))
    }
}

export function expensesFetchData(url) {
    return (dispatch) => {

        dispatch(expensesAreLoading(true));
        console.log(url)
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(expensesAreLoading(false));
               
                return response;
            })
            .then((response) => response.json())
           
            .then((items) => dispatch(expensesFetchDataSuccess(items)))
            .catch(() => dispatch(expensesHaveErrored(true)));
    };
}