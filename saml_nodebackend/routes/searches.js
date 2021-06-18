const router = require('express').Router();
const auth = require('../middleware/auth');

let Search = require("../models/searches.model");

router.get('/', auth, async (req, res) => {
    await Search.find({userId: req.user})
        .then(searches => res.json(searches))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', auth, async (req, res) => {
    const keyword = req.body.keyword;
    const result = req.body.result;

    if (!keyword) return res.status(400).json({msg: "No searches!"});

    const newSearch = new Search({
        userId: req.user,
        keyword,
        result
    });

    await newSearch.save()
        .then(() => res.json(newSearch))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/delete/:id', auth, async (req, res) => {
    const search = await Search.findOne({userId: req.user, _id: req.params.id});

    if (!search) return res.status(400).json({msg: "No search found!"});

    await Search.findByIdAndDelete(req.params.id)
        .then(() => res.json("Search Deleted!"))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;