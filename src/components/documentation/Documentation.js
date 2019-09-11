import React,{Component} from 'react';
import {Link} from "react-router-dom";
class Documentation extends Component{
    render(){
        return(
            <React.Fragment>
                <ul>
                    <li>
                        <Link to="/admin/documentation/use-case-diagram">Use Case Diagram</Link>
                    </li>
                    <li>
                        <Link to="/admin/documentation/entity-relationship-diagram">Entity Relationship Diagram (Database)</Link>
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}
export default Documentation;