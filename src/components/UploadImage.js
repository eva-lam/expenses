import React, {Component} from 'react'; 
import { connect } from 'react-redux';
import { uploadReceipts } from '../actions/expense';
import Button from 'react-bootstrap/Button'


class ImageUpload extends Component {
    state = {
        selectedfile: null,
        uploadedFile:null
    }

    handleFileSelection = event =>{
        this.setState({
            selectedfile: event.target.files[0],
        })
    }
    //handle Single Upload 
    handleOnClick = () => {
 
        this.props.uploadReceipts(this.props.id, this.state.selectedfile)
        //clear Fields After Upload 
        this.setState({ selectedfile: null })
    }
    
    render(){
        return(
            <div>
                <input type="file" name="myFile" multiple={true} onChange={this.handleFileSelection}/>
                <br/>
                <Button variant="outline-secondary" disabled={this.state.selectedfile ? false: true} onClick={this.handleOnClick}>Upload</Button>
                <br/>
                {
                    this.props.images.map((image, index)=> <img width={20} height={20} src={image} alt={image} key={index} />)
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadReceipts: (id, files) => dispatch(uploadReceipts(id, files))
    };
};

export default connect(null, mapDispatchToProps)(ImageUpload);