import axios from "axios";
const key = '8ec7c2477c8d53b63815556eb5283770';
const token = '40e742becdd3afe0435fc30ad4274455d29eca100933bdf292dd5caff6ce2717';


export const getAllBoards = async() => { 
    return await axios.get(`https://api.trello.com/1/members/me/boards?fields=name,url&filter=open&key=${key}&token=${token}`)
        .then(res => res.data).catch(err => {throw new Error(err)});
}

export const createBoards = async(name) => {  // done
    return await axios.post(`https://api.trello.com/1/boards/?name=${name}&key=${key}&token=${token}`)
    .then(res => res.data).catch(err => {throw new Error(err)});
}


export const getList = async(id) => {   
    return await axios.get(`https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`)
    .then(res => res.data);
}

export const createList = async(id, name) => {  
    return await axios.post(`https://api.trello.com/1/lists?name=${name}&idBoard=${id}&key=${key}&token=${token}`)
        .then(res => res.data);
}

export const deleteList = async (id, value) => {   
    return await axios.put(`https://api.trello.com/1/lists/${id}/closed?value=${value}&key=${key}&token=${token}`)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export const getCard = async (listId) => {     
    return await axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`)
        .then(res => res.data);
}

export const deleteCard = async (cardId) => {     
    return await axios.delete(`https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`)
        .then(res => res.data);
}


export const createCard = async (id, name) => {  
    return await axios.post(`https://api.trello.com/1/cards?idList=${id}&name=${name}&key=${key}&token=${token}`)
        .then(res => res.data);
}

export const EditCard = async (id, name) => {  
    return await axios.put(`https://api.trello.com/1/cards/${id}?key=${key}&token=${token}&name=${name}`)
        .then(res => res.data);
}

