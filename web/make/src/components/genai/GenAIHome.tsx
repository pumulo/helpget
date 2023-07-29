import React from "react";
import { useGenaiQuery } from "../../store/apis/genaiApi";

const GenaiHome = () => {
    const payload = {
        prompt: 'Give a description of generative ai and recent developments'
    }
    const { data, error, isLoading } = useGenaiQuery(payload);
    let content;
    if (isLoading) {
        content = <i>loading...</i>
    } else if (error) {
        content = <div>Error loading generative ai response</div>
    } else {
        if (data) {
            content = <p>Currently selected: {JSON.stringify(data)}</p>
        } else {
            content = <div>Error no user found</div>
        }
    }
    return (
        <div>
            Generative AI Home
            {content}
        </div>
    )
};

export default GenaiHome;