const router = require('express').Router();
const OpenAI = require('openai');
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/identify-food', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json("No image uploaded");

        const imageBuffer = fs.readFileSync(req.file.path);
        const base64Image = imageBuffer.toString('base64');

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Identify the food in this image. Return JUST the name of the dish, nothing else." },
                        {
                            type: "image_url",
                            image_url: {
                                "url": `data:image/jpeg;base64,${base64Image}`
                            }
                        }
                    ],
                },
            ],
        });

        const dishName = response.choices[0].message.content;

        // Clean up
        fs.unlinkSync(req.file.path);

        res.status(200).json({ dishName });

    } catch (err) {
        console.error(err);
        res.status(500).json("AI Error");
    }
});

module.exports = router;
