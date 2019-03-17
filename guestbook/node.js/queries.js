const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'alfa',
  password: 'admin',
  port: 5432,
});

const getGuests = (request, response) => {
    pool.query('SELECT * FROM guestbook ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}

const createGuest = (request, response) => {
    const { nama, telp, pesan } = request.body;

    pool.query(`INSERT INTO guestbook (nama, telp, pesan, waktu) VALUES ($1, $2, $3, to_timestamp(${Date.now()} / 1000.0))`, [nama, telp, pesan], (error, results) => {
    if (error) {
        throw error
    }
        pool.query('SELECT * FROM guestbook ORDER BY id DESC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows);
        })
    })
}

module.exports = {
    getGuests,
    createGuest
}