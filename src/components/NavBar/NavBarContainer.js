import {connect} from "react-redux";
import NavBar from "./NavBar";


const mapStateToProps = (state) => {
    return{
        sidebar: state.sidebar
    }
}


const NavBarContainer = connect(mapStateToProps)(NavBar);

export default NavBarContainer;