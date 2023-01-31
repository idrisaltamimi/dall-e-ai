import express from 'express';
import { fileURLToPath } from 'url';
import { Configuration, OpenAIApi } from 'openai';
import { dotenvConfig } from '../utils/index.js';
const __filename = fileURLToPath(import.meta.url);
dotenvConfig(__filename, '/../../.env');
const router = express.Router();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openAI = new OpenAIApi(configuration);
router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
});
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openAI.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
});
export default router;
//# sourceMappingURL=dalleRoutes.js.map