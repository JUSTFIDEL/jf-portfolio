require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const mongoose = require('mongoose')
const { log } = require('console')

// Mongoose connection

let isConnected = false // to track connections

const connectToDB = async () => {
	mongoose.set('strictQuery', true)

	if (isConnected) {
		console.log('MongoDB is already connected')
		return
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'JF-Portfolio',
		})

		isConnected = true

		console.log('MongoDB Connected')
	} catch (err) {
		console.log(err)
	}
}

connectToDB()

//Mongoose Schema
const messageSchema = new mongoose.Schema(
	{
		name: String,
		subject: String,
		email: String,
		message: String,
	},
	{ timestamps: true },
)

const Message = mongoose.model('Message', messageSchema)

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.post(
	'/send',
	async (req, res) => {
		// const { name, subject, email, message } = req.body
		await connectToDB()

		const newMessage = new Message({
			name: req.body.name,
			subject: req.body.subject,
			email: req.body.email,
			message: req.body.message,
		})

		await newMessage
			.save()
			.then(() => {
				res.redirect('/')
			})
			.catch(err => console.log(err))
	},

	// const name = req.body.name
	// const email = req.body.email
	// const subject = req.body.subject
	// const message = req.body.message

	// if (res.statusCode === 200) {
	// 	res.sendFile(__dirname + '/success.html')
	// 	// res.redirect('/')
	// } else {
	// 	res.sendFile(__dirname + '/failure.html')
	// 	res.redirect('/')
	// }
	// }
)

app.get('/success', (req, res) => {
	res.sendFile(__dirname + '/success.html')
})

app.get('/failure', (req, res) => {
	res.sendFile(__dirname + '/failure.html')
})

// app.post('/api/send', (req, res) => {
// 	const { userEmail } = req.body

// 	const config = {
// 		service: 'gmail',
// 		auth: {
// 			user: EMAIL,
//

// app.post('/success', (req, res) => {
// 	res.redirect('/')
// })

// app.post('/failure', (req, res) => {
// 	res.redirect('/')
// })

app.listen(process.env.POST || 3000, () => {
	console.log('Server started on port 3000')
})


// require('dotenv').config()
// const express = require('express')
// const bodyParser = require('body-parser')
// const https = require('https')
// const app = express()
// // const nodemailer = require('nodemailer')
// // const Mailgen = require('mailgen')
// // const { EMAIL, PASSWORD } = require('./env.js')
// // const mailchimp = require('@mailchimp/mailchimp_marketing')

// app.use(express.static('public'))
// app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/index.html')
// })

// app.get('/success', (req, res) => {
// 	res.sendFile(__dirname + '/success.html')
// })

// app.get('/failure', (req, res) => {
// 	res.sendFile(__dirname + '/failure.html')
// })

// app.post('/', (req, res) => {
// 	const name = req.body.name
// 	const email = req.body.email
// 	const subject = req.body.subject
// 	const message = req.body.message

// 	// 	// const data = {
// 	// 	// 	members: [
// 	// 	// 		{
// 	// 	// 			email_address: email,
// 	// 	// 			status: 'subscribed',
// 	// 	// 			merge_fields: {
// 	// 	// 				FNAME: name,
// 	// 	// 			},
// 	// 	// 		},
// 	// 	// 	],
// 	// 	// }

// 	// 	// const jsonData = JSON.stringify(data)

// 	// 	// const url = 'https://us17.api.mailchimp.com/3.0/lists/' + process.env.SERVER

// 	// 	// const options = {
// 	// 	// 	method: 'POST',
// 	// 	// 	auth: 'justfidel:' + process.env.API_KEY,
// 	// 	// }

// 	// 	// const request = https.request(url, options, response => {
// 	// 	// 	if (response.statusCode === 200) {
// 	// 	// 		res.sendFile(__dirname + '/success.html')
// 	// 	// 	} else {
// 	// 	// 		res.sendFile(__dirname + '/failure.html')
// 	// 	// 	}

// 	// 	// 	response.on('data', data => {
// 	// 	// 		console.log(JSON.parse(data))
// 	// 	// 	})
// 	// 	// })

// 	// 	// request.write(jsonData)
// 	// 	// request.end()

// 	// 	/////////////////////////////////
// 	if (res.statusCode === 200) {
// 		res.sendFile(__dirname + '/success.html')
// 		// res.redirect('/')
// 	} else {
// 		res.sendFile(__dirname + '/failure.html')
// 		res.redirect('/')
// 	}
// })

// // app.post('/api/send', (req, res) => {
// // 	const { userEmail } = req.body

// // 	const config = {
// // 		service: 'gmail',
// // 		auth: {
// // 			user: EMAIL,
// // 			pass: PASSWORD,
// // 		},
// // 	}

// // 	const transporter = nodemailer.createTransport(config)

// // 	const MailGenerator = new Mailgen({
// // 		theme: 'default',
// // 		product: {
// // 			name: 'Mailgen',
// // 			link: 'https://mailgen.js',
// // 		},
// // 	})

// // 	const response = {
// // 		body: {
// // 			name: 'JustFidel 2023',
// // 			intro: 'Your bill is here',
// // 			table: {
// // 				data: [
// // 					{
// // 						item: 'Nodemailer Stack',
// // 						description: 'Backend App',
// // 						price: 'N1000',
// // 					},
// // 				],
// // 			},
// // 			outro: 'Looking forward to do business',
// // 		},
// // 	}

// // 	let mail = MailGenerator.generate(response)

// // 	let message = {
// // 		from: EMAIL,
// // 		to: userEmail,
// // 		subject: 'Place Order',
// // 		html: mail,
// // 	}

// // 	transporter
// // 		.sendMail(message)
// // 		.then(() => {
// // 			return res.status(201).json({ msg: 'You should recieve a message' })
// // 		})
// // 		.catch(err => {
// // 			return res.status(500).json({ err })
// // 		})
// // })

// app.post('/success', (req, res) => {
// 	res.redirect('/')
// })

// app.post('/failure', (req, res) => {
// 	res.redirect('/')
// })

// app.listen(process.env.POST || 3000, () => {
// 	console.log('Server started on port 3000')
// })
