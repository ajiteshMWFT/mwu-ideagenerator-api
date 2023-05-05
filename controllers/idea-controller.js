const { Configuration, OpenAIApi } = require("openai");
const { openai_api } = require("../utlis/config");
const Idea = require("../models/ideaModel");






const configuration = new Configuration({
    apiKey: openai_api,
});

const openai = new OpenAIApi(configuration);


const generateIdea = async (req, res) => {


    const { business_field, business_type, user_insight } = req.body

    const prompt = `genrate an startup idea according to following details
    details:
    filed:${business_field}
    business type: ${business_type}
    special insight: ${user_insight}

    `

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": prompt },

            ]

        });
        res.status(200).json(completion.data.choices)
        console.log(completion.data);
        const newIdea = new Idea({
            ip: req.ip,
            prompt: prompt,
            idea: completion.data.choices[0].message.content,
        });
        await newIdea.save();
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            res.status(error.response.status).json(error.response.data)
        } else {
            console.log(error.message);
            res.json(error.message)
        }
    }
}

module.exports = { generateIdea };