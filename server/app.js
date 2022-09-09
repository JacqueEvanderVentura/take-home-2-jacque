const cors = require('cors')
const express = require("express");
const { Agent } = require("./model");

const app = express();
app.use(cors({
  origin:'*'
}))
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded({ extended: true }))

app.get("/agents", async (req, res, next) => {
  const agents = await Agent.findAll();
  return res.json(agents);
});

app.post("/agents", async (req, res, next) => {
  
  console.log(req.body);

  const {
    firstName,
    lastName,
    photoUrl,
    agentLicence,
    address,
    practiceAreas,
    aboutMe,
  } = req.body;

  const params = {
    firstName,
    lastName,
    photoUrl,
    agentLicence,
    address,
    practiceAreas,
    aboutMe,
  };
  try {
    const agents = await Agent.create(params);

    if(!agents){
      return res.status(200).json(agents)
    }
  
    res.status(200).json(agents);
  }
  catch(err) {
    return res.status(500).json(err)
  }
 
});
{
  /* {
  "id": 56,
  "firstName": "Evander",
  "lastName": "Ventura",
  "photoUrl": "https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY",
  "agentLicence": "4021202426",
  "address": "Calle 1era",
  "practiceAreas": "Santo Domingo",
  "aboutMe": "Hi, I am a Web Dev",
  "createdAt": "2022-08-25T17:32:35.494Z",
  "updatedAt": "2022-08-25T17:32:35.494Z"
} */
}

module.exports = app;
