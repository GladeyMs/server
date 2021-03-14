import express from 'express'
import connection from './config'

const router = express.Router()

connection.connect((err) => {
	if (err) throw console.error(err.message)
	console.log('MySql Connected')
	router.get('/', (req, res, next) => {
		connection.query(`SELECT * FROM user_tb`, (err, result) => {
			if (err) {
				res.status(500).json({
					error: err,
					status: 500,
					message: 'Internal Server Error',
				})
			}
			res.json({
				result,
				message: 'Get user success',
			})
		})
	})

	router.post('/', (req, res) => {
		const {
			username,
			first_name,
			last_name,
			email,
			last_update_by,
			create_by,
		} = req.body
		connection.query(
			'INSERT INTO user_tb SET username = ?, first_name = ?, last_name = ?, email = ?, last_update_by = ?, create_by = ?',
			[username, first_name, last_name, email, last_update_by, create_by],
			(err) => {
				if (err) {
					res.status(500).json({
						error: err,
						status: 500,
						message: 'Internal Server Error',
					})
				}
				res.status(200).json({
					result: JSON.stringify(result),
					message: 'Insert user successfully',
				})
			}
		)
	})

	router.delete('/delete/:id', (req, res) => {
		const id = req.params.id
		connection.query(
			`DELETE FROM user_tb WHERE user_id = ?`,
			[id],
			(err, result) => {
				if (err) {
					res.status(500).json({
						error: err,
						status: 500,
						message: 'Internal Server Error',
					})
				}
				res.status(200).json({
					result: JSON.stringify(result),
					message: 'Delete user successfully',
				})
			}
		)
	})

	router.put('/edit/:id', (req, res) => {
		const id = req.params.id
		const { first_name, last_name, email, last_update_by } = req.body
		connection.query(
			`UPDATE user_tb 
			SET first_name = ?, last_name = ?, email = ?, last_update_by = ?
			WHERE user_id = ?`,
			[first_name, last_name, email, last_update_by, id],
			(err, result) => {
				if (err) {
					res.status(500).json({
						error: err,
						status: 500,
						message: 'Internal Server Error',
					})
				}
				res.status(200).json({
					result: JSON.stringify(result),
					message: 'Edit user successfully',
				})
			}
		)
	})
})

module.exports = router
