import request from "./api";

export const tableService = {
    addTable: (data)=>
        request('/tables/createtable', 'POST' , data),
    deleteTable: (id)=>
        request(`/tables/deletetable/${id}` , "DELETE"),
    updateTable: (id , data)=>
         request(`/tables/deletetable/${id}` , "PUT", data),
    
}