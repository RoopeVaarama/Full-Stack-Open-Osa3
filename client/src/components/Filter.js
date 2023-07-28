import React from 'react';

const Filter = ({ search, setSearch }) => {
    return (
        <div>filter shown with <input value={search} onChange={e => setSearch(e.target.value)}></input></div>
    )
}

export default Filter;