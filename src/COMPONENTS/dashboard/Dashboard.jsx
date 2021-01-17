import './Dashboard.css'
import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import valuesIn from 'lodash/valuesIn'
import Routes from './../../redux/routes'
import Loader from 'react-loader-spinner'
import Skeleton from 'react-loading-skeleton';



import {Input, Badge, Switch, Select, Avatar, Button} from 'antd'
import { UserOutlined } from '@ant-design/icons';


//-----Actions-------
import * as actions from './../../redux/actions/actions'

//------components---
import Buddies from './../buddies/Buddies'



class Dashboard extends React.Component{
    state = {
        first_name:null,
        surname:null,
        marrital_status:null
    };
    componentDidMount(){
        this.props.persistState()
        this.props.getData()
    }

    handleInput = (e, field) => {
        if(field === 'first_name'){this.setState({first_name: e.target.value})}
        if(field === 'surname'){this.setState({surname: e.target.value})}
        if(field === 'marrital_status'){this.setState({marrital_status: e})}
    };
    logout = () => {
        sessionStorage.removeItem('token')
        this.props.logout()
    };
    submit = () => {
       let profile = {
           first_name:this.state.first_name,
           surname:this.state.surname,
           marrital_status:this.state.marrital_status
       }
       this.props.submitProfile(profile)
    }
    render(){
        let token = this.props.token,
            session_token = sessionStorage.getItem('token'),
            isAddedBuddy = this.props.isAddedBuddy;
        if(token === null ){return <Redirect to={Routes.login}/>}
        if(isAddedBuddy){return <Redirect to={Routes.saved}/>}

        const is_disabled =
                this.first_name  === null ||
                this.state.surname === null ||
                this.state.marrital_status === null

        const friends = this.props.friends,
              buddies = valuesIn(friends).filter(friend => {
                  return friend.body.buddy
              })

        return(
            <div className="dashboard" >
               <div className="header-db">
                   <div className="header-db-left">
                       Dashboard
                   </div>
                    <div className="header-db-right">
                         <span onClick={this.logout} style={{cursor:'pointer'}}>
                             <Link to="/saved" style={{color:'#fff'}}>
                                  Buddies&nbsp;&nbsp;&nbsp;&nbsp;
                             </Link>
                         </span>
                        <span onClick={this.logout} style={{cursor:'pointer'}}>
                           <Avatar icon={<UserOutlined />} />
                            &nbsp;
                            Logout
                        </span>
                    </div>
               </div>
                <div className="row" style={{position:'relative', top: '100px'}}>
                    <div className="col-lg-12">
                        <div className="db-form-wrap">
                            {
                                this.props.isSubmittingBuddy?
                                    <div style={{marginTop:'40px'}}>
                                        <Loader
                                            type="Puff"
                                            color="#00BFFF"
                                            height={60}
                                            width={100}
                                        />
                                        <b>Submitting buddy</b>
                                        <br/><br/>
                                    </div>
                                        :
                                        <React.Fragment>
                                            <h2 style={{marginTop:'10px'}}>Add new buddy</h2>
                                            <div className="login-form" style={{
                                                marginTop:'0px', textAlign:'left', paddingLeft:'30px'
                                            }}>
                                                <div>
                                                    <b>First name</b>
                                                    <Input
                                                        placeholder="First name"
                                                        className="lg-input-field"
                                                        onChange={(e)=>this.handleInput(e, 'first_name')}
                                                    />
                                                </div>
                                                <div>
                                                    <b>Surname name</b>
                                                    <Input
                                                        placeholder="Surname"
                                                        className="lg-input-field"
                                                        onChange={(e)=>this.handleInput(e, 'surname')}
                                                    />
                                                </div>
                                                <div>
                                                    <b>Marrital status</b>
                                                    <div>
                                                        <Select className="lg-input-field"
                                                                onChange={(e)=>this.handleInput(e, 'marrital_status')}
                                                                defaultValue="Select a meal">
                                                            <option value="married">Married</option>
                                                            <option value="single">Single</option>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <Button disabled={is_disabled} className="login-btn"
                                                        onClick={this.submit}>
                                                    Submit
                                                </Button>
                                            </div>
                                            <div className="form-extra">
                                               </div>
                                        </React.Fragment>
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => ({
      token: state.main.token,
      friends:state.main.friends,
      isSubmittingBuddy:state.main.isSubmittingBuddy,
      isFetchingFriends:state.main.isFetchingFriends,
      isAddedBuddy:state.main.isAddedBuddy
});

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
        persistState: () => dispatch(actions.persistState()),
        submitProfile: (profile) => dispatch(actions.submitProfile(profile)),
        getData: () => dispatch(actions.getData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);