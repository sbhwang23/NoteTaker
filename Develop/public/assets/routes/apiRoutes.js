const fs = require('fs');
const path = require('path');
const notes = require('../../../db/db.json');


module.exports = function(app) {
   
    app.get('/api/notes', (req, res) => {
        const notes = fs.readFileSync(path.join(__dirname,'../../../db/db.json'), 'utf8');
        res.json(JSON.parse(notes));
    });

    app.post('/api/notes', (req, res) => {
        notes.push(req.body);

        fs.writeFileSync(path.join(__dirname,'../../../db/db.json'), JSON.stringify(notes), err => {
            if (err) {
            throw err
            }
        });
        res.json(req.body);
    });

    app.delete('/api/notes/:id', (req, res) => {
        const deleteId = req.params.id;
       
        notes.forEach((note) => {
            if (note.id === deleteId) {
                const noteId = notes.indexOf(note);
                notes.splice(noteId, 1);
            }
        });
        
        fs.writeFileSync(path.join(__dirname,'../../../db/db.json'), JSON.stringify(notes), err => {
            if (err) {
            throw err
            }
        });
        res.json(notes);
    });
}       