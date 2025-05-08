
// Define the interface for the Ollama API response
interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
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
    
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral', // Default model - could be configurable
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json() as OllamaResponse;
    return data.response;

  } catch (error) {
    console.error('Error generating ad copy:', error);
    
    // Provide a fallback response if Ollama is not available
    return `Headline: ${campaignName} - Perfect for ${interests.join(' & ')} enthusiasts\nDescription: Discover what makes ${campaignName} the perfect choice for your ${interests[0] || 'specific'} needs today!`;
  }
};
