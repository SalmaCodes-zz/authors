var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/angular-app/dist'));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');
var AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'An author name must contain at least three characters!']
    },
    quotes: [{
        content: {
            type: String,
            required: true,
            minlength: [3, 'A quote must contain at least three characters!']
        },
        votes: {
            type: Number,
            default: 0
        }
    }]
})

mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');

mongoose.Promise = global.Promise;

// Routes
// 1. Retrieve all Authors
app.get('/authors', function (req, res) {
    Author.find({}, function (err, authors) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            res.json({ message: "Success", data: authors });
        }
    })
})

// 2. Retrieve an Author by ID
app.get('/authors/:id', function (req, res) {
    Author.findOne({ _id: req.params.id }, function (err, author) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            res.json({ message: "Success", data: author });
        }
    })
})

// 3. Create an Author
app.post('/authors', function (req, res) {
    var author = new Author({ name: req.body.name });
    author.save(function (err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success", data: author })
        }
    })

})

// 4. Update an Author by ID
app.put('/authors/:id', function (req, res) {
    Author.findOne({ _id: req.params.id }, function (err, author) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            author.name = req.body.name;
            author.save(function (err, data) {
                if (err) {
                    console.log("Returned error", err);
                    res.json({ message: "Error", error: err });
                } else {
                    res.json({ message: "Success", data: data });
                }
            });
        }
    })
})

// 5. Delete an Author by ID
app.delete('/authors/:id', function (req, res) {
    Author.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success" })
        }
    });
})


// Write new quote.
app.post('/authors/:id/quotes', function (req, res) {
    Author.findOne({ _id: req.params.id }, function (err, author) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            let quote = req.body.quote;
            author.quotes.push(quote);
            author.save(function (err, data) {
                if (err) {
                    console.log("Returned error", err);
                    res.json({ message: "Error", error: err });
                } else {
                    res.json({ message: "Success" });
                }
            })
        }
    })
})

// Vote quote up.
app.patch('/quotes/:id/upvote', function (req, res) {
    Author.update(
        { 'quotes._id': req.params.id },
        {
            $inc: { 'quotes.$.votes': 1 }
        }, function (err, data) {
            if (err) {
                console.log("Returned error", err);
                res.json({ message: "Error", error: err });
            } else {
                res.json({ message: "Success", data: data });
            }
        }
    )
})

// Vote quote down.
app.patch('/quotes/:id/downvote', function (req, res) {
    Author.update(
        { 'quotes._id': req.params.id },
        {
            $inc: { 'quotes.$.votes': -1 }
        }, function (err, data) {
            if (err) {
                console.log("Returned error", err);
                res.json({ message: "Error", error: err });
            } else {
                res.json({ message: "Success", data: data });
            }
        }
    )
})

// Delete a quote.
app.delete('/quotes/:id/:quoteId', function (req, res) {
    Author.update(
        { _id: req.params.id},
        {
            $pull: { quotes: { _id: req.params.quoteId } }
        }, function (err, data) {
            if (err) {
                console.log("Returned error", err);
                res.json({ message: "Error", error: err });
            } else {
                console.log('DATA', data);
                res.json({ message: "Success", data: data });
            }
        }
    )
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./angular-app/dist/index.html"));
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})
