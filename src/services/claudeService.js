/**
 * Claude API Service for VoteWise
 * This service handles communication with the Claude API to provide contextual Q&A.
 */

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

export const askClaude = async (question, moduleContext) => {
  if (!API_KEY) {
    console.warn('Claude API key not found. Returning mock response.');
    return getMockResponse(question, moduleContext);
  }

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true' // Required for client-side calls
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        system: `You are VoteWise AI, a helpful and approachable civic education assistant. 
                Your goal is to help first-time voters, students, and new citizens understand elections.
                Keep your answers concise, non-partisan, and encouraging.
                You are currently helping the user with: ${moduleContext.title}. 
                Context for this module: ${moduleContext.summary}`,
        messages: [
          { role: 'user', content: question }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment!";
  }
};

const getMockResponse = (question, moduleContext) => {
  // Simple mock logic for development without an API key
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`[DEMO MODE] That's a great question about ${moduleContext.title}! In a real environment with a Claude API key, I would provide a detailed, non-partisan answer here. For now, remember that understanding "${question}" is a key part of your civic journey.`);
    }, 1000);
  });
};
