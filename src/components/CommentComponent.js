import React, {Component} from 'react'; 
import axios from 'axios'; 

class Comment extends Component {
    constructor(props){
        super(props)
        this.state={  
            message:'',
            loading:false, 
            id:''
        }
    }

  

    dataChange =(event)=>{
        this.setState({[event.target.name]:event.target.value}
            )
    }
    idChange =(event)=>{
        this.setState({[event.target.name]:event.target.value}
            )
    }

    
    postData(event){
    
        event.preventDefault()
        this.setState({
            loading:true
        })
        const newcomment = this.state.message; 
        const key = this.state.id; 
        console.log(key)
        const data = {
            'comment':newcomment
        }
        //data = setting key and content to post 
        
        axios.post(`http://localhost:3000/expenses/${key}`,data)
        .then(res =>{
            
            console.log(res.data); 
            this.setState({
                loading:false, 
                message:res.data.comment
            })
        })
        .catch(err=>{
            console.log(err)
            this.setState({
                loading:false,


            })
        })


    }

    loadOrShowMsg(){
        if(this.state.loading){
            return<p>Loading...</p>
        }else{
            return<p>{this.state.message}</p>
        }
    }


    render(){
        
        console.log('this state'+ this.state)
        return(
            <div>
                <form onSubmit={this.postData.bind(this)}>
                 
                    <input type="text" placeholder="your comment" name="message" value={this.state.message}  onChange={this.dataChange.bind(this)}/>
                    <input type="text" placeholder="id" name="id" value={this.state.id} onChange={this.dataChange.bind(this)}/>
                    <input type="submit"/>
                </form>

              
              

              
              
               
               <div> {this.state.message}</div>

            </div>
            
        )
    }
}

export default Comment; 