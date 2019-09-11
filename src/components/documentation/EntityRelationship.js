import React from 'react';
import {Link} from "react-router-dom";
function EntityRelationship() {
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
            <img src="/img/entity-relationship.png" alt="Entity Relationship"/>
            <a href="https://www.draw.io/#G1fYffxQFiIR1wYFfvKXHvZZ1F1d5xXGfJ" target="_blank" className="btn btn-success">Edit</a>
        </React.Fragment>
    );
}
export default EntityRelationship;