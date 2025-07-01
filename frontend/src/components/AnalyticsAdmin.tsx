import React, { useState } from 'react';
import {  GetQueryByName } from '../services/AdminServices';

const queryNames = [
    "Product Launch Sales",
    "Cart vs Order Revenue",
    "Top 5 Products by Season",
    "Units and Revenue by Region and Brand",
    "Quarterly FYTD Revenue",
    "Shipping Delays",
    "Time Between Orders"
];
const AnalyticsTable = () => {
    const [queryResult, setQueryResult] = useState<any[]>([]);
    const [queryError, setQueryError] = useState<string | null>(null);
    const [queryLoading, setQueryLoading] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState<string>("");

    const handleQueryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setSelectedQuery(name);
        setQueryLoading(true);
        setQueryError(null);
        try {
            const result = await GetQueryByName(name);
            setQueryResult(Array.isArray(result) ? result : []);
        } catch (err: any) {
            setQueryError(err?.message || "Error fetching query");
            setQueryResult([]);
        } finally {
            setQueryLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col lg:p-4 dark:bg-gray-800 dark:bg-gradient-to-b dark:from-orange-300/30 dark:to-blue-gray-900 w-full h-full lg:overflow-hidden overflow-x-auto text-gray-700 bg-white lg:shadow-md rounded-lg bg-clip-border">
            <div className="flex justify-start mb-4">
                {queryNames.map((name) => (
                    <label
                    key={name}
                    className={`cursor-pointer px-4 py-2 mr-2 rounded-md transition
                        ${selectedQuery === name
                        ? "bg-blue-500 dark:bg-orange-800/30 text-white rounded-md text-center"
                        : "bg-gray-200 dark:bg-gray-800 dark:text-black text-center hover:scale-105"}
                    `}
                    >
                    <input
                        type="radio"
                        name="query"
                        value={name}
                        checked={selectedQuery === name}
                        onChange={handleQueryChange}
                        className="sr-only"
                    />
                    {name}
                    </label>
                ))}
            </div>
            {queryLoading && <div>Loading query...</div>}
            {queryError && <div className="text-red-500">{queryError}</div>}
            {queryResult.length > 0 && queryResult[0] && typeof queryResult[0] === "object" && !Array.isArray(queryResult[0]) ? (
                <table className="w-full text-center table-auto min-w-max pl-7 ml-3">
                    <thead>
                        <tr>
                            {Object.keys(queryResult[0]).map((key) => (
                                <th key={key} className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {queryResult.map((row, idx) => (
                            <tr key={idx}>
                                {Object.keys(queryResult[0]).map((key, i) => (
                                    <td key={i} className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">
                                        {row[key] !== null && row[key] !== undefined ? String(row[key]) : ""}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !queryLoading && <div className="text-gray-500">No data to display.</div>
            )}
        </div>
    );
};

export default AnalyticsTable;