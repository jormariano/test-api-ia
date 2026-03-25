import OpenAI from 'openai';

export default async function handleAPI(req, res) {
  try {
    const openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        error: 'No se recibió imageBase64',
      });
    }

    const response = await openAI.responses.create({
      model: 'gpt-5.2',
      instructions:
        'You are an assistant that recognizes if an image is of a car and if it is damaged.',
      input: [
        {
          role: 'user',

          content: [
            {
              type: 'input_text',
              text: `
Analiza esta imagen y responde en JSON:

{
 "is_car": true/false,
 "condition": "good" | "damaged",
 "damage_description": "describe daños visibles"
}
`,
            },
            {
              type: 'input_image',
              image_url: imageBase64,
            },
          ],
        },
      ],
    });

    const text = response.output_text;

    const parsedResult = JSON.parse(text);

    res.status(200).json(parsedResult);

    console.log('Imagen recibida:', imageBase64?.slice(0, 50));
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
