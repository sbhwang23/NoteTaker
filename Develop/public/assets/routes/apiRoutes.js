const fs = require('fs');

module.exports = function(app) {

    app.get('/api/notes', function(req, res) {
       const notes = fs.readFileSync(path.join(__dirname,'../../../db/db.json'), 'utf8');
       res.send(JSON.parse(notes));
    })

    // app.post('/api/notes', function(req, res) {

    // })

    // app.delete('/api/notes/:id')
}