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
        'You are an assistant that recognizes if an image is of a car and if it is damaged. Always respond in Spanish.',

      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: 'Analiza esta imagen y describe los daños en español.',
            },
            {
              type: 'input_image',
              image_url: imageBase64,
            },
          ],
        },
      ],

      text: {
        format: {
          type: 'json_schema',
          name: 'car_analysis',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              is_car: { type: 'boolean' },
              condition: {
                type: 'string',
                enum: ['good', 'damaged'],
              },
              damage_description: {
                type: 'string',
              },
            },
            required: ['is_car', 'condition', 'damage_description'],
            additionalProperties: false,
          },
        },
      },
    });

    let parsedResult;

    if (response.output_parsed) {
      parsedResult = response.output_parsed;
    } else if (response.output_text) {
      parsedResult = JSON.parse(response.output_text);
    } else {
      return res.status(500).json({
        error: 'No se pudo obtener respuesta del modelo',
      });
    }

    res.status(200).json(parsedResult);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
