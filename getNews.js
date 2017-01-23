module.exports.getNewsType = function(input){
    switch (input) {
        case 'insurance':
            return new Promise(function(resolve,reject){
                resolve(input);
            }).catch(function(err){
                return err;
            });
        case 'thought':
            return new Promise(function(resolve,reject){
                resolve("thought of the day");
            }).catch(function(err){
                return err;
            });
        default:
            return "something else";
    }
};