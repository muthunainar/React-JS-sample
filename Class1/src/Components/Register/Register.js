import './Register.css';
import { fNameValidation, lNameValidation, emailValidation, passwordValidation } from '../Validation';
import { Component } from 'react';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      getValidation: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  }
  onChangeHandler = (event) => {
    this.setState({
      getForm: {
        ...this.state.getForm,
        [event.target.name]: event.target.value
      }
    })
  }
  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({
      getValidation: {
        email: !emailValidation(this.state.getForm.email) ? "please provide email" : '',
        password: !passwordValidation(this.state.getForm.password) ? "Please provide the password" : '',
        firstName: !fNameValidation(this.state.getForm.firstName) ? "please Enter Proper First Name" : '',
        lastName: !lNameValidation(this.state.getForm.lastName) ? "Please Enter Proper Last Name" : ''
      }
    });
    if (emailValidation(this.state.getForm.email) && passwordValidation(this.state.getForm.password)
      && fNameValidation(this.state.getForm.firstName) && lNameValidation(this.state.getForm.lastName)) {
      alert("Successfully Logged-In");
      sessionStorage.setItem("email", this.state.getForm.email);
      sessionStorage.setItem("password", this.state.getForm.password);
      sessionStorage.setItem("firstName", this.state.getForm.email);
      sessionStorage.setItem("lastName", this.state.getForm.password);
      document.location.href = "/login"; 
    }
  }
  render() {
    return (<div>
      <div className="container">
        <div className="row">
          <div className="col-4">

          </div>
          <div className="col-4">
            <form>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" onChange={this.onChangeHandler} value={this.state.getForm.firstName} className="form-control" id="firstName" name="firstName" placeholder="Enter first name" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" onChange={this.onChangeHandler} value={this.state.getForm.lastName} className="form-control" id="lastName" name="lastName" placeholder="Enter last name" />
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input type="email" onChange={this.onChangeHandler} value={this.state.getForm.email} className="form-control" id="email" name="email" placeholder="Enter email" />
                {this.state.getValidation.email && <div class="alert alert-danger" role="alert">
                  {this.state.getValidation.email}
                </div>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" onChange={this.onChangeHandler} value={this.state.getForm.password} className="form-control" id="password" name="password" placeholder="Password" />

                {this.state.getValidation.password && <div class="alert alert-danger" role="alert">
                  {this.state.getValidation.password}
                </div>}
              </div>

              <button onClick={this.onSubmitHandler} type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
          <div className="col-4">

          </div>
        </div>

      </div>
    </div>)
  }

}
export default Register;