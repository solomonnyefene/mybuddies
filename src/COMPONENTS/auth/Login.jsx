import './Login.css'
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Input, message, Button} from 'antd'
import Routes from './../../redux/routes'

//-----Actions-------
import {login} from './../../redux/actions/actions'

class Login extends React.Component{
    state = {id:null, password:null};

    handleInput = (e, field) => {
        if(field === 'email'){this.setState({id: e.target.value})}
        if(field === 'password'){this.setState({password: e.target.value})}
    };
    login = () => {
        const user = {id:this.state.id, password: this.state.password};
        let is_valid_email;
        if (typeof this.state.id !== null) {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(this.state.id )) {
                is_valid_email = false;
                message.error("Please enter a valid email address");
            } else {is_valid_email = true}
        }
        if(is_valid_email === true){
            if(user.id !== 'admin@email.com' || user.password !== 'password'){
                message.error('You entered wrong email or password')
            }else {this.props.login(user)}
        }
    }
    render(){
        const user = {
            id:this.state.id,
            password: this.state.password
        };
        const is_disabled = this.state.id === null || this.state.password === null,
               token = this.props.token

        if(token){return <Redirect to={Routes.dashboard}/>}


        return(
           <div className="App">
               <h1 className="welcome-text">Welcome to Migmen, login</h1>
               <div className="login-form">
                   <div>
                       <b>Email</b>
                       <Input placeholder="Enter eail"
                              className="lg-input-field"
                              onChange={(e)=>this.handleInput(e, 'email')}
                       />
                   </div>
                   <div>
                       <b>Password</b>
                       <Input type="password"
                              placeholder="Enter password"
                              className="lg-input-field"
                              onChange={(e)=>this.handleInput(e, 'password')}
                       />
                   </div>
                   <Button disabled={is_disabled} className="login-btn"
                           onClick={this.login}>
                       Login
                   </Button>
               </div>
               <div className="form-extra">
                   <div><large>Forgot password? <a>Reset</a></large></div>
                   <div><large>Not registered yet? <a style={{color:'orange'}}>SIGN UP</a></large></div>
               </div>
           </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.main.token,
});

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(login(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);