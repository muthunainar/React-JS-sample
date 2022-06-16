import './AdminSearch.css';
import { Component } from 'react';
import axios from 'axios';

class AdminSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            index: -1,
            Search: '',
            Book: {
                title: '',
                desc: '',
                author: '',
                avail: ''
            }
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3000/addbook').then((response) => {
            console.log(response.data)
            this.setState({ list: response.data });
        }).catch((error) => {
            console.log(error);
        })
    }

    onDeleteHandler = (index) => {
        let bookDetails = [...this.state.list];
        let id = bookDetails[index].id;
        axios.delete('http://localhost:3000/addbook/' + id).then((response) => {
            bookDetails.splice(index, 1);
            this.setState({ list: bookDetails });
        }).catch(() => {

        })
    }
    onEditHandler = (index) => {
        this.setState({
            Book: {
                title: this.state.list[index].title,
                desc: this.state.list[index].desc,
                author: this.state.list[index].author,
                avail: this.state.list[index].avail
            },
            index: index
        })
    }
    onChangeHandler = (event) => {
        this.setState({
            Book: {
                ...this.state.Book, [event.target.name]: event.target.value
            }
        })
    }
    onChangeSearchHandler = (event) => {
        this.setState({ Search: event.target.value });
    }
    onEditSubmitHandler = (event) => {
        event.preventDefault();
        let bookDetails = [...this.state.list];
        let id = bookDetails[this.state.index].id;
        axios.patch('http://localhost:3000/addbook/' + id, {
            title: this.state.Book.title,
            desc: this.state.Book.desc,
            author: this.state.Book.author,
            avail: this.state.Book.avail
        }).then(() => {
            this.setState({ list: bookDetails });
            bookDetails[this.state.index].title = this.state.Book.title;
            bookDetails[this.state.index].desc = this.state.Book.desc;
            bookDetails[this.state.index].author = this.state.Book.author;
            bookDetails[this.state.index].avail = this.state.Book.avail;
        }).catch(() => {

        })
    }
    searchFilter = (event) => {
        event.preventDefault();
        let details = this.state.list.filter((obj) => {
            return obj.title === this.state.Search;
        })
        this.setState({ list: details });
    }
    resetFilter=(event)=>{
        event.preventDefault();
        this.setState({Search:''})
        axios.get('http://localhost:3000/addbook').then((response)=>{
        console.log(response);
        this.setState({
        list:response.data
        })
        }).catch((error)=>{
        console.log(error);
        });
        }
    // resetFilter = (event) => {
    //     event.preventDefault();
    //     this.setState({ Search: '' });
    //     if (JSON.parse(sessionStorage.getItem('bookDetails')) && JSON.parse(sessionStorage.getItem('bookDetails')).length > 0) {
    //         this.setState({ list: JSON.parse(sessionStorage.getItem('bookDetails')) })
    //     }
    // }
    render() {
        return (<div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <form>
                            <div><h2>Search Book</h2></div>
                            <br />
                            <label className="classlabel">Book Title: <input type="text" value={this.state.Search} onChange={this.onChangeSearchHandler} id="bookName" name="searchbookName" /></label>
                            <br />
                            <button onClick={this.searchFilter} type="submit" className="btn btn-success2">Search</button>
                            <button onClick={this.resetFilter} type="submit" className="btn btn-success3">Reset</button>
                            <br /><br />
                        </form>
                        <div className='col-7'></div>
                        <div className='col-2'>
                            <button type="submit" className="btn btn-success">Link expense</button>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Book ID</th>
                            <th scope="col">Book Title</th>
                            <th scope="col">Book Desc</th>
                            <th scope="col">Author Name</th>
                            <th scope="col">No.Of Book Available</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list.map((obj, index)=>{
                            return(<tr key={index}>
                                    <th scope="row">{index}</th>
                                    <td>{obj.title}</td>
                                    <td>{obj.desc}</td>
                                    <td>{obj.author}</td>
                                    <td>{obj.avail}</td>
                                    <td><i onClick={() =>this.onEditHandler(index)} data-toggle="modal" className="fa fa-pencil" aria-hidden="true" data-target="#edit"></i>
                                    </td>
                                    <td><i onClick={() =>this.onDeleteHandler(index)} data-toggle="modal" className="fa fa-trash" aria-hidden="true" data-target="#delete"></i>
                                        <div className="container-fluid">
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="modal" id="edit" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="classform1">
                                <br />
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="form-group">
                                                    <label>Book Title:</label>
                                                </div>
                                            </td>
                                            <td><input type="text" value={this.state.Book.title} onChange={this.onChangeHandler} id="title" className="classlabel" name="title" /></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-group">
                                                    <label>Book Desc:</label>
                                                </div>
                                            </td>
                                            <td><input type="text" value={this.state.Book.desc} onChange={this.onChangeHandler} id="desc" className="classlabel" name="desc" /></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-group">
                                                    <label>Author Name:</label>
                                                </div>
                                            </td>
                                            <td><input type="text" value={this.state.Book.author} onChange={this.onChangeHandler} id="name" className="classlabel" name="author" /></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-group">
                                                    <label>Number of <br />Book Available:</label>
                                                </div>
                                            </td>
                                            <td><input type="number" value={this.state.Book.avail} onChange={this.onChangeHandler} id="number" className="classlabel" name="avail" /></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.onEditSubmitHandler} data-dismiss="modal" className="btn btn-success">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" id="delete" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Book details deleted successfully
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success1" data-dismiss="modal">Delete-It</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}
export default AdminSearch;