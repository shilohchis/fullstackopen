import React from 'react';

const FlatList = ({ datas, showKeys }) => {
    return (
        <>
        {
            datas.map(data => <p key={showKeys.map( key => `${data[key]}` )}>{ showKeys.map(keyObj => `${data[keyObj]} `) }</p>)
        }
        </>
    );
};

export default FlatList;
