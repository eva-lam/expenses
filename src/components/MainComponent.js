import React, { Component } from 'react';
import ReactTable from 'react-table'; 
import { connect } from 'react-redux';
import moment from 'moment';

import Comment from '../components/CommentComponent';
import ImageUpload from '../components/UploadImage'; 
import { getExpenses } from '../actions/expense';

import "react-table/react-table.css";

class Main extends Component {
    state = {
        search:'',
        comment:'',
    }; 

    constructor(){
        super(); 
        this.columns=[
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
                accessor: 'receipt',
                sortable:false,
                filterable:false
            },
            
        ]
    }

    componentDidMount() {
        this.props.getExpenses();
    }

    handleChange =(event)=>{
        this.setState({[event.target.name]: event.target.value})
    }
    
    render() {
        const { expenses, hasError, isLoading } = this.props;
        const data = expenses && expenses.map(expense => 
            ({
                date: moment(expense.date).format('YYYY/MM/DD HH:mm:ss'),
                currency: expense.amount.currency,
                amount: expense.amount.value,
                first: expense.user.first,
                last: expense.user.last, 
                merchant: expense.merchant,
                comment: <Comment message={expense.comment} id={expense.id} />,
                receipt: <ImageUpload images={expense.receipts} id={expense.id} />
            })
        )
          
        return (
            <div className='Main'>
                { hasError && <p>Sorry! There was an error loading the expenses</p> }
                { isLoading ? <p>Loading</p> :
                    <ReactTable
                        columns={this.columns}
                        data={data}
                        sortable
                        filterable
                    >
                    </ReactTable>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        expenses: state.expenseReducer.expenses,
        hasErrored: state.expenseReducer.hasErrored,
        isLoading: state.expenseReducer.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getExpenses: (limit, offset) => dispatch(getExpenses(limit, offset))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);