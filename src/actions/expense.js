import axios from 'axios';
const { REACT_APP_API_SERVER } = process.env;


export function expensesHaveErrored(bool) {
    return {
        type: '@expenses/ERROR',
        hasError: bool
    };
}

export function expensesAreLoading(bool) {
    return {
        type: '@expenses/LOADING',
        isLoading: bool
    };
}


export function expensesFetchDataSuccess(expenses) {
    return {
        type: '@expenses/FETCH_ALL_SUCCESS',
        expenses // <-- this is a short form, and the long version is expenses: expenses
    };
}


// version 2: passing items
// export function expensesFetchDataSuccess(items) {
//     return {
//         type: '@expenses/FETCH_ALL_SUCCESS',
//         expenses: items
//     };
// }


export const createCommentSuccess =(id,comment)=>{
    return{
        type:'@expenses/CREATE_COMMENT_SUCCESS',
        id,
        comment
    };
}

export const uploadReceiptsSuccess =(id,receipts)=>{
    return{
        type:'@expenses/UPLOAD_RECEIPTS_SUCCESS',
        id,
        receipts
    }
}

export const getExpenses = (limit = 25, offset = 25)=> async(dispatch) => {
    try{
        dispatch(expensesAreLoading(true)); 
        const response = await axios.get(`${REACT_APP_API_SERVER}/expenses?limit=${limit}&offset=${offset}`)
        if(response.status === 200){
            dispatch(expensesFetchDataSuccess(response.data.expenses))
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
        const response = await axios.post(`${REACT_APP_API_SERVER}/expenses/${id}`,{comment})
        if(response.status===200){
            dispatch(createCommentSuccess(id,comment))
        }else{
            throw new Error('CREATE_COMMENT_FAILED')
        }
    }catch(e){
       
        dispatch(expensesHaveErrored(true))
    }
}; 

export const uploadReceipts =(id,file)=>async(dispatch)=>{
    try{
        
        // const filename=[file]
        // console.log('filename is',filename)
        const formData = new FormData()
        formData.append("receipt", file)
        formData.append("id", id)
        // console.log("!!file", typeof(file))
        // console.log(Array.from(filename).map((file)=>formData.append('receipts', file),formData.append('id',id)) )//this past to backend
        
        // let receiptdata = formData.get('receipts'); 

        const response = await axios.post(`${REACT_APP_API_SERVER}/expenses/${id}/receipts`,formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        
       //console.log('response is ',response)
        if(response.status === 200){
            //console.log('after axios.post- response.data is as follow',response.data)
            //console.log(response.data.receipts[0].url)
            const filePaths = response.data.receipts.map((name)=>`${REACT_APP_API_SERVER}/${name.url}`)
            // console.log('filepaths',filePaths)
            dispatch(uploadReceiptsSuccess(id,filePaths))
        }else{
            throw new Error('UPLOAD_RECEIPTS_FAILED')
        }
    }catch(e){
        //console.error(e)
        dispatch(expensesHaveErrored(true))
    }
}

// export const uploadReceipts2 =(id,file)=>async(dispatch)=>{
//     try{
//         const filename=[file[0].name]
//         Array.from(filename).map((file)=>formData.append('receipts', file))
//         const res = await axios.post('/upload', formData,{
//             headers:{
//                 'Content-Type':'multipart/form-data'
//             }
//         })

//         const {fileName,filePath}= res.data; 

//         setUploadedFile({fileName,filePath}); 


//     }catch(err){
//         if(err.response.status===500){
//             console.log('There was a problem with the server'); 
//         }else{
//             console.log(err.response.data.msg)
//         }
//     }
// }

// export function expensesFetchData(url) {
//     return (dispatch) => {

//         dispatch(expensesAreLoading(true));
//         console.log(url)
//         fetch(url)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw Error(response.statusText);
//                 }

//                 dispatch(expensesAreLoading(false));
               
//                 return response;
//             })
//             .then((response) => response.json())
           
//             .then((items) => dispatch(expensesFetchDataSuccess(items)))
//             .catch(() => dispatch(expensesHaveErrored(true)));
//     };
// }