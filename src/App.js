import './App.css';
import "./components/common/FontawsomeIcons/FontAwesome"
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React, {useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializedApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import store from "./redux/redux-store";


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
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SocialApp;
