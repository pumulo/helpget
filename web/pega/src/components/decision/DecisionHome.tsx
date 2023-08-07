import React from "react";
import { useDecisionListQuery } from "../../store";

const DecisionHome = () => {
    const { data, error, isLoading } = useDecisionListQuery('all');
    let content;
    if (isLoading) {
        content = <i>loading...</i>
    } else if (error) {
        content = <div>Error loading Decision</div>
    } else {
        if (data) {
            content = <p>Currently selected: {JSON.stringify(data)}</p>
        } else {
            content = <div>Error no user found</div>
        }
    }
    return (
        <div>
            Decision Home
            {content}
        </div>
    )
};

export default DecisionHome;