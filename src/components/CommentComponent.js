import React, {Component} from 'react'; 
import {createComment } from '../actions/expense'; 
import {connect} from 'react-redux'; 
import Button from 'react-bootstrap/Button';

class Comment extends Component {
    constructor(props){
        super(props)
        this.state={  
            message:'',
        }
    }

    handleOnClick = (event)=>{
        const {message}=this.state; 
        this.props.createComment(this.props.id, message)
        this.setState({message:''})
    }

    dataChange =(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
    
        return(
            <div>
                <input type="text" placeholder="your comment" name="message" value={this.state.message} onChange={this.dataChange.bind(this)}/>
                    <br/> 
                    
                    <Button variant="outline-secondary" onClick = {this.handleOnClick}>Submit</Button>         
               <div> {this.props.message}</div>
             

            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return { 
        createComment:(id,comment)=>dispatch(createComment(id, comment))
    }; 
}; 

export default connect(null, mapDispatchToProps)(Comment); 