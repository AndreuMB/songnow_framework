function g_promise(urlg, p_data=undefined){
    console.log("g_promise");
    console.log(urlg);
    console.log(p_data);
    return new Promise(function (resolve, reject){
        $.ajax({
            type:'POST',
            dataType: "json",
            url: urlg,
            data: {p_data} //data u take with post = function var
        })
        .done(function(data){
            console.log("resolve");
            resolve(data);
        })
        .fail(function(data){
            console.log(data);
            console.log("reject");
            reject();
        })
    })
}