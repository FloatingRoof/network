import './App.css';
import "./components/common/FontawsomeIcons/FontAwesome"
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, {Suspense, useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializedApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import store from "./redux/redux-store";
import ProfileContainerHook from "./components/Profile/ProfileContainerHOOK";
import {Navigate} from "react-router-dom";
import {errorMessage} from "./utils/errorMessage";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));
const SettingsContainer = React.lazy(() => import('./components/Settings/SettingsContainer'));


const App = (props) => {

    useEffect(() => {
        props.initializedApp();
    }, [props.initialized]);
    function catchAllUnhandledErrors(event) {
        errorMessage(event.reason);
    }
    useEffect(() => {
         window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
        // Указываем, как сбросить этот эффект:
        return function cleanup() {
            window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
        };
    });


    if (!props.initialized)
        return <Preloader/>
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <NavBarContainer/>
            <div className='app-wrapper-content'>
                <Suspense fallback={ <Preloader/> }>
                    <Routes>
                        <Route path="/" element={ <Navigate replace to="/profile" /> }/>
                        <Route exact path='/profile/' element={<ProfileContainerHook />}>
                            <Route path=":userId" element={<ProfileContainerHook />}/>
                        </Route>
                        <Route path='/dialogs' element={<DialogsContainer />}>
                            <Route path=':userId' element={<DialogsContainer />} />
                        </Route>
                        <Route path='/friends' element={<UsersContainer isFriends={true} />}/>
                        <Route path='/news' element={<News />}/>
                        <Route path='/music' element={<Music />}/>
                        <Route path='/settings' element={<SettingsContainer />}/>
                        <Route path='/users' element={<UsersContainer  isFriends={null} />}/>
                        <Route path='/login' element={<Login />}/>
                        <Route path='*' element={<div>404 NOT FOUND</div>}/>
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
