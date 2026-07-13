import request from "./api";

export const tableService = {
    addTable: (data)=>
        request('/tables/createtable', 'POST' , data),
    deleteTable: (id)=>
        request(`/tables/deletetable/${id}` , "DELETE"),
    updateTable: (id , data)=>
         request(`/tables/updatetable/${id}` , "PUT", data),
    getTable: (id) =>
        request(`/tables/getTable/${id}` , "GET" ) ,
    updateStatus: (id , data) =>
         request(`/tables/updatetablestatus/${id}` , "PUT" , data ) ,
    
}