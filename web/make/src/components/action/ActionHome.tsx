import React from "react";
import { useActionListQuery } from "../../store/apis/actionApi";

const ActionHome = () => {
    const { data, error, isLoading } = useActionListQuery('all');
    let content;
    if (isLoading) {
        content = <i>loading...</i>
    } else if (error) {
        content = <div>Error loading Action</div>
    } else {
        if (data) {
            content = <p>Currently selected: {JSON.stringify(data)}</p>
        } else {
            content = <div>Error no user found</div>
        }
    }
    return (
        <div>
            Action Home
            {content}
        </div>
    )
};

export default ActionHome;