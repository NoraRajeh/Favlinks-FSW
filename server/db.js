const Pool = require('pg').Pool
const pool = new Pool(
    {
        user: 'nr',
        host: 'localhost',
        database: 'linksapi',
        password: '12345678',
        port: 5432,
    })

const getLinks = (req, res) => {
    pool.query('SELECT * FROM favlinks ORDER BY id ASC', (error, result) => {
        if (error) {
            throw error
        }
        return res.status(200).json(result)
    })
}
const createLinks = (req, res) => {
    const url = req.body.url
    const name = req.body.name
    pool.query('INSERT INTO favlinks(name, url) VALUES($1, $2) RETURNING id', [name, url], (error, result) => {
        if (error) {
            throw error
        }
        return res.status(204).json(result)
    })
}
const deleteLinks = (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM favlinks WHERE id=$1', [id], (error, result) => {
        if (error) {
            throw error
        }
        return res.status(200).json(result)
    })
}

const updateLinks = (req, res) => {
    const url = req.body.url
    const name = req.body.name
    const id = req.params.id
    pool.query('UPDATE favlinks SET name=$1, url=$2 WHERE id=$3', [name, url, id], (error, result) => {
        if (error) {
            throw error
        }
        return res.status(200).json(result)
    })
}
module.exports = {
    getLinks,
    createLinks,
    updateLinks,
    deleteLinks
}