import React,{Component} from 'react';
import {Link} from "react-router-dom";
class Footer extends Component{
    render(){
        return(
            <footer>
                <Link to="/admin/documentation">Documentation</Link>
            </footer>
        )
    }
}
export default Footer;