// Define the interface for the Ollama API response
interface OllamaResponse {
  response: string;
}

/**
 * Generate ad copy using Ollama API with the specified model
 */
export const generateAdCopy = async (
  campaignName: string,
  interests: string[]
): Promise<string> => {
  try {
    const interestsText = interests.join(', ');
    
    const prompt = `Generate a short ad headline and one-line description for a campaign named "${campaignName}" targeted at people interested in ${interestsText}. Format as "Headline: [headline]\nDescription: [description]"`;
    
    const requestBody = {
      model: 'tinydolphin:latest',
      prompt: prompt,
      stream: false,
    };

    console.log('Sending request to Ollama:', requestBody);
    
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    const responseText = await response.text();
    console.log('Response text:', responseText);

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} - ${response.statusText}\nResponse: ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText) as OllamaResponse;
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      throw new Error('Invalid response format from Ollama');
    }

    if (!data.response) {
      throw new Error('No response content from Ollama');
    }

    return data.response;

  } catch (error) {
    console.error('Error generating ad copy:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    
    // Provide a fallback response if Ollama is not available
    return `Headline: ${campaignName} - Perfect for ${interests.join(' & ')} enthusiasts\nDescription: Discover what makes ${campaignName} the perfect choice for your ${interests[0] || 'specific'} needs today!`;
  }
};
