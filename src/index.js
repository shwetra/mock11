const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const JobModel=require("./jobModel/model")




require("dotenv").config()
const PORT = process.env.PORT ;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get("/home",(req,res)=>{
  res.send("welcome Home")
})
app.get("/", async (req, res) => {
  const data = await JobModel.find();
  res.send({ status: true, JobModel: data, })
})



app.post("/postjob", async (req, res) => {
	const new_job = new JobModel(req.body);
	await new_job.save()
	res.send("added")
})

app.post("/jobs", async (req, res) => {
	const { position } = req.body
	if (position) {
		const data = await JobModel.find({position})
		res.send({ data: data })
	} else {
		const data = await JobModel.find()
		res.send({ data: data })
	}
})


app.listen(PORT, () => {
  dbConnect();
  console.log(`Server started on port ${PORT}`);
});
