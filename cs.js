function patchGQLQuery(obj)
{
    team_condition = {"state":{"_eq":"soft_launched"}};
    report_clause = obj["variables"]["where"]["report"];
    if(report_clause === null || report_clause === undefined){
        report_clause = {};
    }
    report_clause["team"] = team_condition;
    obj["variables"]["report"] = report_clause;
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
