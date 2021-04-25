function patchGQLQuery(obj)
{
    team_condition = {"state":{"_eq":"soft_launched"}};
    where_clause = obj["variables"]["where"];
    if(where_clause === null || where_clause === undefined){
        where_clause = {};
    }
    where_clause["team"] = team_condition;
    obj["variables"]["where"] = where_clause;
    console.log(obj);
    return obj;
}

const Mock = window.fetch;
console.log("Patching fetch");
window.fetch = function() {
    if(arguments[0] == "/graphql")
    {
        obj = JSON.parse(arguments[1]["body"]);
        operation = obj["operationName"];
        if(operation == "HacktivityPageQuery")
        {
            console.log("HacktivityPageQuery found!");
            arguments[1]["body"] = JSON.stringify(patchGQLQuery(obj));
        }
    }
    return Mock.apply(this, arguments);
}
