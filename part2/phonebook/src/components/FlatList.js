import React from 'react';

const FlatList = ({ datas, showKeys, onDelete }) => {
    const confirmDelete = id => {
        onDelete(id);
    };

    return (
        <>
        {
            datas.map(data => {
                return (
                    <div key={showKeys.map( key => `${data[key]}` )}>
                        <span>{ showKeys.map(keyObj => `${data[keyObj]} `) }</span>
                        <button onClick={() => confirmDelete(data.id)}>delete</button>
                    </div>
                )
            })
        }
        </>
    );
};

export default FlatList;
