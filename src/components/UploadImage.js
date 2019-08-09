import React, {Component} from 'react'; 
import axios from 'axios'; 

const API = 'http://localhost:3000'
class ImageUpload extends Component {
    state ={
        selectedFile: null,
        id:null
    }

    fileSelectedHandler = event=>{
        console.log(event); 
        this.setState({
            selectedFile:event.target.files[0],
            id:event.target.files[0].id
        })
    }

    fileUploadHander=()=>{
        const ImageID = this.state.id; 
        const fd = new FormData()
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
        axios.post(`${API}/expenses/${ImageID}/receipts`,fd)
            .then(res=>{
                console.log('this is res'+ res); 
            })
    }
    
    render(){
        return(
            <div>
                <input type="file" onChange={this.fileSelectedHandler}/>
                <button onClick ={this.fileUploadHandler}>Upload</button>
            </div>
        )
    }
}

export default ImageUpload