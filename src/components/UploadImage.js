import React, {Component} from 'react'; 
import {connect} from 'react-redux'; 
import {uploadReceipts} from '../actions/expense'; 


class ImageUpload extends Component {
    state ={
        selectedFile: null,
    }

    HandleFileSelection = event =>{
        this.setState({
            selectedFiles: event.target.files,
        })
    }

    handleOnClick = () =>{
        this.props.uploadReceipts(this.props.id, this.state.selectedFiles)
        this.setState({selectedFiles:null})
    }
    
    render(){
        return(
            <div>
                <input type="file" multiple={true} onChange={this.fileSelectedHandler}/>
                <br/>
                <button disabled={this.state.selectedFiles?false:true} onClick ={this.handleOnClick}>Upload</button>
                <br/>

                {/* {this.props.images.map((image,index)=><img width={20} height={20} src={image} alt={image} key={index}/>)} */}
            </div>
        )
    }

   
}

const mapDispatchToProps = (dispatch)=>{
    return{
        uploadReceipts:(id,files)=> dispatch(uploadReceipts(id,files))
    }; 
}; 

export default connect(null,mapDispatchToProps)(ImageUpload); 