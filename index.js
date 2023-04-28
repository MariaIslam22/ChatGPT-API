import {Configuration, OpenAIApi} from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const configuration = new Configuration({
    organization:"org-IYqusufwLpo1R2bkO887utdz",
    apiKey: "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"
})

const openai = new OpenAIApi(configuration);
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());



let message = "";
let reply = "";
app.get("/", (req, res) => {
    res.render("index", {mess: message, completion: reply});
})

app.post("/reply", async (req, res) => {
    message = req.body.message;
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: message
            }
        ]
    })
    reply = completion.data.choices[0].message.content
    res.render("index", {mess: message, completion: reply});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
