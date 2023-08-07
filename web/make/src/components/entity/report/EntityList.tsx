import React from "react";
import JSONPretty from 'react-json-pretty';
import './JSON.css';
import { useEntityByTypeListQuery } from "../../../store";

interface EntityI {
    id: string
    type: string
    description: string
    values: {}
    status: string
    createdAt: string
}

export const EntityList = ({type}: {type: string}) => {
    const { data, error, isLoading } = useEntityByTypeListQuery(type);
    const entityArray: EntityI[] = data;
    let content;
    var JSONPrettyMon = require('react-json-pretty/dist/monikai');

    const createURLs = (type: string, id: string) => {
        return (
            <ul className="list-disc">
                <li key={ type + id} className="pb-2">
                    {`Query All (GET): api.get-it.solutions/entity/query-by-type/${type}`}
                </li>
                <li key={ type + id + 'instance'} className="pb-2">
                    {`Query Instance (GET): api.get-it.solutions/entity/query-by-id/${id}`}
                </li>
                <li key={ type + id + 'updateinstance'} className="pb-2">
                    {`Update Instance (PUT): api.get-it.solutions/entity/update`}
                    <br />
                    link to get sample json
                </li>
                <li key={ type + id + 'createinstance'} className="pb-2">
                    {`Update Instance (POST): api.get-it.solutions/entity/create`}
                    <br />
                    link to get sample json
                </li>
                <li key={ type + id + 'deleteinstance'}>
                    {`Delete Instance (DELETE): api.get-it.solutions/entity/delete-by-id/${id}`}
                </li>
            </ul>
        )
    }

    const createRow = (id: string, type: string, description: string, values: string, status: string, createdAt: string) => {
        return (
            <tr className="border-b dark:border-neutral-500 align-text-top" key={`etr${id}`}>
                <td className="border px-6 py-4 font-medium">{(new Date(createdAt)).toLocaleString()}</td>
                <td className="border px-6 py-4">{type}</td>
                <td className="border px-6 py-4">{description}</td>
                <td className="border px-6 py-4"><JSONPretty data={values} themeClassName='get-it_json-pretty'></JSONPretty></td>
                <td className="border px-6 py-4">{createURLs(type, id)}</td>
                <td className="border px-6 py-4">{status}</td>
            </tr>
        )
    }

    const createEntityTableBody = () => {
        // console.log(entityArray);
        return (
            <tbody>
                {
                    entityArray.map(
                        (entity, index) => {
                            return createRow(
                                entity.id,
                                entity.type,
                                entity.description,
                                JSON.stringify(entity.values),
                                entity.status,
                                entity.createdAt
                            )
                        }
                    )
                }
            </tbody >
        );
    }

    if (isLoading) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={6}>
                        Loading entity data...
                    </td>
                </tr>
            </tbody>
        )
    } else if (error) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={6}>
                        Error loading entity
                    </td>
                </tr>
            </tbody>
        )
    } else {
        if (data) {
            content = createEntityTableBody()
        } else {
            content = (
                <tbody>
                    <tr>
                        <td colSpan={6}>
                            Error loading Entities
                            <div>
                                <span>
                                    {error}
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            )
        }
    }

    return (
        <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="shadow min-w-full text-left text-sm font-light table-auto">
                            <thead className="border-b font-medium dark:border-neutral-500 place-items-auto text-center">
                                <tr>
                                <th scope="col" className="border w-1/16 px-6 py-4">Created</th>
                                <th scope="col" className="border px-1/16 py-4">Type</th>
                                <th scope="col" className="border px-1/8 py-4">Description</th>
                                <th scope="col" className="border w-9/16 px-6 py-4">Values</th>
                                <th scope="col" className="border px-1/8 py-4">URLs</th>
                                <th scope="col" className="border px-1/16 py-4">Status</th>
                                </tr>
                            </thead>
                            {content}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}