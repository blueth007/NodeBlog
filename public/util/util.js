function formToJson(formArr){
    var json={};
    formArr.forEach(val=>{
        json[val.name]=val.value;
    })
    
    return json;
}