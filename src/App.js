import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Routes from './redux/routes'


//-----components-----
import Login from './COMPONENTS/auth/Login'
import Dashboard from './COMPONENTS/dashboard/Dashboard'
import Buddies from './COMPONENTS/buddies/Buddies'

function App() {
  return (
    <div >
        <div className="login-form-wrap">
            <Router>
                <Switch>
                    <Route exact path={Routes.login} component={Login} />
                    <Route path={Routes.dashboard} component={Dashboard} />
                    <Route path={Routes.saved} component={Buddies} />
                </Switch>
            </Router>
        </div>
    </div>
  );
}

export default App;
