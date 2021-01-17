import './../dashboard/Dashboard.css'
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

const { Search } = Input;

class Buddies extends React.Component{
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
    };
    searchBuddy = (e) => {this.props.searchBuddy(e.target.value)};
    render(){
        let token = this.props.token,
            session_token = sessionStorage.getItem('token');

        let isAddedBuddy = this.props.isAddedBuddy;
        if(token === null){return <Redirect to={Routes.login}/>}
        if(isAddedBuddy){return <Redirect to={Routes.saved}/>}

        const is_disabled =
            this.first_name  === null ||
            this.state.surname === null ||
            this.state.marrital_status === null

        const friends = this.props.friends

        const search = this.props.search
         let buddies;
        if(search.searchText !== null && search.searchText !== ''){
            buddies = search.searchResults
        }else {
            buddies = valuesIn(friends).filter(friend => {return friend.body.buddy})
        }

        return(
            <div className="dashboard" >
                <div className="header-db">
                    <div className="header-db-left">
                        Dashboard
                    </div>
                    <div className="header-db-right">
                         <span onClick={this.logout} style={{cursor:'pointer'}}>
                             <Link to={Routes.dashboard} >
                                 <Button type="primary">Add</Button>
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                             </Link>
                         </span>
                        <span onClick={this.logout} style={{cursor:'pointer'}}>
                           <Avatar icon={<UserOutlined />} />
                            &nbsp;
                            Logout
                        </span>
                    </div>
                </div>
                <div className="row" style={{position:'relative', left:'10px', top: '100px'}}>
                    <div className="col-lg-12 text-center">
                        <div style={{marginTop:'20px', padding:'0px 40px  20px 20px'}}>
                            <h3>
                                {
                                    this.props.isFetchingFriends? 'Fetching your buddies...'
                                        :
                                        <span>
                                           Your buddies&nbsp;
                                            <Badge count={valuesIn(buddies).length}>
                                            </Badge>
                                       </span>
                                }
                            </h3>
                            <div className="search-wrap">
                                <Search
                                    placeholder="Search for buddy"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                     onChange={this.searchBuddy}
                                />

                            </div>
                            {
                                this.props.isFetchingFriends?
                                    <Skeleton count={10}/>
                                    :
                                    <div className="table table-responsive" >
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr style={{fontSize:'15px', background:'#ecf0f1'}}>
                                                <th style={{minWidth:'30px'}}>ID#</th>
                                                <th style={{minWidth:'130px'}}>First name</th>
                                                <th style={{minWidth:'100px'}}>Surname</th>
                                                <th style={{minWidth:'100px'}}>Married?</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                valuesIn(buddies).map((buddy) => {
                                                    return(
                                                        <tr style={{fontSize:'14px'}}>
                                                            <th >{buddy.id}</th>
                                                            <th >{buddy.body.buddy.first_name}</th>
                                                            <th >{buddy.body.buddy.surname}</th>
                                                            <th >
                                                                {
                                                                    buddy.body.buddy.marrital_status === 'married' &&
                                                                    <Switch  defaultChecked/>
                                                                }
                                                                {
                                                                    buddy.body.buddy.marrital_status === 'single' &&
                                                                    <Switch  value={false}/>
                                                                }
                                                            </th>
                                                        </tr>
                                                    )
                                                })
                                            }

                                            </tbody>
                                        </table>
                                    </div>
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
    search:state.main.search,
    isSubmittingBuddy:state.main.isSubmittingBuddy,
    isFetchingFriends:state.main.isFetchingFriends
});

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
        persistState: () => dispatch(actions.persistState()),
        searchBuddy: (text) => dispatch(actions.searchBuddy(text)),
        getData: () => dispatch(actions.getData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buddies);