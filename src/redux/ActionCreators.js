import * as ActionTypes from './ActionTypes'; 

export const addComment = ( id, name, comment) => ({

    type: ActionTypes.ADD_COMMENTS,
    Payload:{
        id:id,
        name:name,
        comment:comment
    }
}) 
export const getComment = ()=>({
    type:ActionTypes.GET_COMMENTS,
    Payload:{

    }
})

export const postComment = ( id, name, comment)=>(dispatch)=>{
    const { REACT_APP_API_SERVER } = process.env;
    const newFeedback = {
        id:id,
        name:name,
        comment:comment
        
    }
    //update an expense 

    return fetch(`${REACT_APP_API_SERVER}/expenses/${id}`,{
        method:'POST',
        body:JSON.stringify(newFeedback),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'

    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error '+response.status+':'+response.statusText);
            error.response = response; 
            throw error; 
        }
    },

    error=>{
        var errmess = new Error(error.message); 
        throw errmess
    })
    .then(response=>response.json())
    .then(response=> dispatch(addComment(response)))
    .catch(error=>{console.log('Post comments',error.message)
        alert('Your comment could not be posted\nError: '+error.message)
        })

}

export const UploadReceipt = ()=>({
    type:ActionTypes.ADD_RECEIPTS,
    Payload:{
        
    }
})