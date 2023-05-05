const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY||"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",
});
const openai = new OpenAIApi(configuration);


const generateIdea = async(req, res) => {

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
        console.log(completion.data.choices);
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