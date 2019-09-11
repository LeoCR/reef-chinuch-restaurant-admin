import React from 'react';
import {Link} from "react-router-dom";
function UseCaseDiagram() {
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
            <img src="/img/use-case-diagram.png" alt="Use Case Diagram"/>
            <a href="https://www.draw.io/#G115ZLU_6gR2WP3TzOdGDZoBcDKg2Shoj0" target="_blank" className="btn btn-success">Edit</a>
        </React.Fragment>
    );
}
export default UseCaseDiagram;