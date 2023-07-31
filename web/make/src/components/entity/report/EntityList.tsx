import React from "react";
import { useEntityListQuery } from "../../../store";

interface EntityI {
    type: string
    description: string
    values: {}
    status: string
}

export const EntityList = () => {
    const { data, error, isLoading } = useEntityListQuery('all');
    const entityArray: EntityI[] = data;
    let content;
    

    const createRow = (index: number, type: string, description: string, values: string, status: string) => {
        return (
            <tr className="border-b dark:border-neutral-500" key={`etr${index}`}>
                <td className="border px-6 py-4 font-medium">{index}</td>
                <td className="border px-6 py-4">{type}</td>
                <td className="border px-6 py-4">{description}</td>
                <td className="border px-6 py-4">{values}</td>
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
                                index,
                                entity.type,
                                entity.description,
                                JSON.stringify(entity.values),
                                entity.status
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
        content = <div>Error loading entity</div>
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
                        <th scope="col" className="border w-1/16 px-6 py-4">#</th>
                        <th scope="col" className="border px-1/8 py-4">Type</th>
                        <th scope="col" className="border px-1/4 py-4">Description</th>
                        <th scope="col" className="border w-1/2px-6 py-4">Values</th>
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