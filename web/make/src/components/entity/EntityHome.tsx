import React from "react";
import { useEntityQuery } from "../../store";

interface EntityState {
    entity: any
}
const EntityHome = () => {
    const { data, error, isLoading } = useEntityQuery('64c542e0bfcb69046adacc35');
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