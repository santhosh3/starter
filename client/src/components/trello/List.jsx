import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TrelloContext } from './Context';
import { getList } from './Api';

function List() {
    const { boardId } = useParams();
    const { list, setList } = useContext(TrelloContext);

    async function getLists() {
        try {
            const response = await getList(boardId);
            setList(prev => ({ ...prev, loading: false, data: response }))
        } catch (error) {
            setList(prev => ({ ...prev, loading: false, error: error.message }))

        }
    }

    useEffect(() => { getLists() }, [boardId]);

    let { loading, data, error } = list;

    if (loading) {
        return <div>Loading</div>;
    } else if (error !== null) {
        return <div>{error}</div>;
    } else {
        return (
            <div>
                {
                    data.map((item) => (
                        <div key = {item.id}>
                            {item.name}
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default List