import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import ReactTable from 'react-table'; 
import Moment from 'react-moment';
import axios from 'axios'; 
import Comment from '../components/CommentComponent';
import ImageUpload from '../components/UploadImage'; 


import "react-table/react-table.css";

class Main extends Component {
    constructor(){
        super(); 
        this.state={
            search:'',
            comment:'',
            // filteredData:[],
            tableData: [{
                    ID: '',
                    index:'',
                    date: '',
                    currency:'',
                    amount:'',
                    merchant: '',
                    firstname: '',
                    lastname: '',
                    comment:''
                    
                }],
        }; 
        
    }

    componentDidMount() {
        const API = 'http://localhost:3000/expenses?limit=25&offset=25'
        this.props.fetchData(API);
        console.log(this.props.items)
    }


    formatDate(date){
        //take out the z 
    
        var now = date.replace('Z', '')
        return now 
    }

    handleChange =(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit =(id,event)=>{
        //stop browser from reloading the page
        event.preventDefault(); 
        const content = {
            comment:this.state.comment
        }
       axios.post(`http://localhost:3000/expenses/${id}`,{content})
        .then(res =>{
            console.log('this is response'+ res); 
            console.log(res.data); 
        })

    }
    
    render() {
       
        const columns=[
            {
                Header:'Date',
                accessor:"date",
                sortable:false,
                filterable:false
            },
            {
                Header:'Currency',
                accessor:"currency",
                
            },
            {
                Header:'Amount',
                accessor:"amount",
              
            },
            {
                Header:'First Name',
                accessor:'first',
              
            },
            {
                Header:'Last Name',
                accessor:"last",
              
            },
            {
                Header:'Merchant',
                accessor:"merchant",
             
            },
            {
                Header:'Comments',
                accessor:'comment'
            },
            {
                Header:'Add Receipt',
                Cell:props=>{
                    return( <ImageUpload/>)
                },
                sortable:false,
                filterable:false
            },
            
        ]
       
        const data = (this.props.items.map(item=> 
            
            
            [
                {
                    date:<Moment format='YYYY/MM/DD HH:mm:ss'>{this.formatDate(item.date)}</Moment>,
                    currency:item.amount.currency,
                    amount: item.amount.value,
                    merchant:item.merchant,
                    first:item.user.first,
                    last:item.user.last, 
                    comment:<Comment/>
                },
            ]
        ))
       
            if (this.props.hasErrored) {
                return <p>Sorry! There was an error loading the items</p>;
            }
    
            if (this.props.isLoading) {
                return <p>Loading</p>;
            }
          
        return (
            
            <div className='Main'>
                
                <ReactTable
                    columns={columns}
                    data={data.map(hits=>hits[0] )}
                    sortable
                    filterable
                >

                </ReactTable>
                
               
               
            </div>
        );
    }
}


const mapStateToProps = (state) => {
  
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);


