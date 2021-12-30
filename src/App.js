import './App.css';
import "./components/common/FontawsomeIcons/FontAwesome"
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, {Suspense, useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializedApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import store from "./redux/redux-store";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));

const App = (props) => {

    useEffect(() => {
        props.initializedApp();
    }, [props.initialized]);


    if (!props.initialized)
        return <Preloader/>
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <NavBarContainer/>
            <div className='app-wrapper-content'>
                <Suspense fallback={<Preloader/>}>

                    <Routes>
                        <Route exact path='/profile/' element={<ProfileContainer/>}>
                            <Route path=":userId" element={<ProfileContainer/>}/>
                        </Route>
                        <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/login' element={<Login/>}/>
                        {/*Для ошибки 404*/}
                        {/*<Route path='*' element={...}/>*/}
                    </Routes>
                </Suspense>

            </div>
        </div>

    );
};

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(connect(mapStateToProps, {initializedApp}))(App);

const SocialApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocialApp;
