import React from "react";
import { useEntityListQuery } from "../../store";

const EntityHome = () => {
    const { data, error, isLoading } = useEntityListQuery('all');
    let content;
    if (isLoading) {
        content = <i>loading...</i>
    } else if (error) {
        content = <div>Error loading entity</div>
    } else {
        if (data) {
            content = <p>Currently selected: {JSON.stringify(data)}</p>
        } else {
            content = <div>Error no user found</div>
        }
    }
    return (
        <div>
            Entity Home
            {content}
        </div>
    )
};

export default EntityHome;