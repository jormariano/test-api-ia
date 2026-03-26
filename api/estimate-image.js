import OpenAI from 'openai';

export default async function handleAPIEstimate(req, res) {
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
        'You read handwritten car repair budgets. Extract structured data in Spanish. If a value does not exist in the image, return null.',

      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: 'Lee este presupuesto manuscrito y devuelve los datos estructurados.',
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
          name: 'budget_analysis',
          strict: true,

          schema: {
            type: 'object',

            properties: {
              workshop: { type: ['string', 'null'] },
              date: { type: ['string', 'null'] },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    description: { type: 'string' },
                    price: { type: 'number' },
                  },
                  required: ['description', 'price'],
                  additionalProperties: false,
                },
              },
              subtotal: {
                type: ['number', 'null'],
              },
              iva: {
                type: ['number', 'null'],
              },
              discount: {
                type: ['number', 'null'],
              },
              total: {
                type: ['number', 'null'],
              },
            },
            required: [
              'workshop',
              'date',
              'items',
              'subtotal',
              'iva',
              'discount',
              'total',
            ],
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
    }

    res.status(200).json(parsedResult);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
}
