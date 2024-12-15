import express from "express";
import bodyParser from 'body-parser';
import nodemailer from "nodemailer";

const app = express();
const port = 3000;
const myIP = '192.168.1.25'
const companyEmail = 'markosouxlos@gmail.com';

app.use(express.static("public"));
app.use(express.urlencoded({ extended:true }));



app.get("/", (req,res) => {
    res.render("home.ejs")
});

app.get("/work", (req,res) => {
    res.render("work.ejs");
});

app.get("/about", (req,res) => {
    res.render("about.ejs")
});

app.get("/contact", (req,res) => {
    res.render("contact.ejs")
});


// Rerirect
app.get("/work/kappari", (req,res) => {
    res.redirect(`http://${myIP}:5000`);
});
app.get("/work/aiantas", (req,res) => {
    res.redirect(`http://${myIP}:80`);
});
app.get("/work/meal-planner", (req,res) => {
    res.redirect(`http://${myIP}:5500`);
});



//form handler
app.post("/send", (req,res) => {
    
    const data = {
		name: req.body.name,
		email: req.body.email,
		msg: req.body.message,
	}

	console.log(data);
    
	// SMTP configuration
	const transporter = nodemailer.createTransport({
		service: 'gmail', 
		auth: {
			user: companyEmail,
			pass: 'optl tveg xhvb qoae',
		},
	});

	const mailOptions = {
		from: companyEmail,
		to: companyEmail, 
		subject: 'Full-Stack Developer Portofolio',
		text: `
Οναμα: ${data.name}
Email: ${data.email}
Μηνυμα: ${data.msg}`
	};

	transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
			console.error('Error sending email:', error);
		} else {
			console.log('Email sent successfully:', info.response);
		}
	});

	res.render("home.ejs", {submited: true});

})


// 404 handler
app.use((req, res) => {
    res.status(404).render("404.ejs", { url: req.originalUrl });
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});