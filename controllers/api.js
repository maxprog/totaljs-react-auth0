exports.install = function() {

    // `F.onAuthorize` will be called for each of the following routes
    F.route('/todos', getTodos, ['authorize']);
    F.route('/todos/{id}', getTodo, ['authorize']);
    F.route('/todos/{todo}', addTodo, ['authorize', 'post']);
    F.route('/todos/{todo}', updateTodo, ['authorize', 'post', ]);
    F.route('/todos/{id}', deleteTodo, ['authorize', 'delete']);

    //Not protected 
    F.route('/list', getList);


    //Let's add logging for each request so we know what's going on:
    F.on('request', function(req, res) {
        console.log(`[${req.method}] ${req.url}`);
    });

    F.route('#401', custom); // Unauthorized


};

function getList() {
    var self = this;
    self.json([1, 2, 3, 4, 5]);
}


var todoList = [{ 'id': 1, 'text': 'position 1' }, { 'id': 2, 'text': 'position 2' }, { 'id': 3, 'text': 'position 3' }];

function getTodos() {
    var self = this;
    self.json(todoList);
}

function getTodo(id) {
    var self = this;
    var todo = {};
    var found = false;
    var i = 0;
    while (i < todoList.length && !found) {
        if (!found && todoList[i].id == id) todo = todoList[i];
        i++;
    }
    self.json(todo);
}

function addTodo(todo) {
    var self = this;
    todoList.push(todo);
    self.json({ 'operation': 'addTodo', 'result': 'OK' });
}

function updateTodo(todo) {
    var self = this;
    self.json({ 'operation': 'updateTodo', 'result': 'OK' });
}

function deleteTodo(id) {
    var self = this;
    todoList.splice(id, 1);
    self.json({ 'operation': 'deleteTodo', 'result': 'OK' });
}

function custom() {
    var self = this;
    self.json({ 'error': '401:Unauthorized' });
}