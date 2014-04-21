var vk = new vk_JSONP();

function printUser(userId) {

    vk.call(
        'users.get',
        {
            user_ids: userId,
            fields: [
                'sex', 'bdate', 'city', 'country'
            ]
        },
        function(data) {
            for (var item in data) {
                document.getElementById('text').innerHTML += item + ' = ' + data[item] + '\n';
                if (typeof data[item] == 'object') {
                    arguments.callee(data[item]);
                    document.getElementById('text').innerHTML += '\n';
                }
            }
        }
    );
}
