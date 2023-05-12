const { Configuration, OpenAIApi } = require("openai");
const { openai_api } = require("../utlis/config");
const Idea = require("../models/ideaModel");
const Logo = require("../models/logoModel");






const configuration = new Configuration({
    apiKey: openai_api,
});

const openai = new OpenAIApi(configuration);


const generateLogo = async (req, res) => {


    const { company_name, company_industry, logo_color, logo_style, symbol, contain_text } = req.body

    let prompt

    try {
        const promptCreation = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system", "content": `create prompt for open ai dall-e using following details -
                    company's industry - ${company_industry},
                    company name - ${company_name},
                    logo's color - ${logo_color},
                    logo style - ${logo_style},
                    symbol - ${symbol}
                    logo contain text - ${contain_text}
                    `
                },

            ]

        });
        prompt = await promptCreation.data.choices[0].message.content

        const completion = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "256x256"

        });

        res.status(200).json(completion.data.data[0].url)
        console.log(completion.data);
        const newLogo = new Logo({
            ip: req.ip,
            prompt: prompt,
            logo: completion.data[0].url,
        });
        await newLogo.save();
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

module.exports = { generateLogo };