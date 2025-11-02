import { WebhookResponse, WebhookError } from '../types';

const WEBHOOK_URL = 'https://n8n.srv915514.hstgr.cloud/webhook/prompt%20enhancer';

/**
 * Sends a prompt and enhancement mode to the n8n webhook.
 * This function is designed to be resilient to different n8n response formats.
 * It can handle JSON, plain text, and empty responses gracefully.
 */
export const enhancePrompt = async (prompt: string, mode: string): Promise<WebhookResponse> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, mode }),
    });

    if (!response.ok) {
        // If the server returns a non-2xx status, get the error message as text.
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText || 'Unknown server error'}`);
    }

    // Get the response as raw text first to avoid JSON parsing errors on empty/invalid bodies.
    const responseText = await response.text();

    if (!responseText) {
        // Handle empty responses explicitly with a clear error message.
        throw new Error('The enhancement service returned an empty response. Please check the n8n workflow configuration.');
    }

    // Try to parse the text as JSON.
    try {
        const data = JSON.parse(responseText);

        // Standard n8n structure often wraps the output in an array like: [ { "json": { ... } } ]
        if (Array.isArray(data) && data[0] && data[0].json && typeof data[0].json.enhancedPrompt === 'string') {
            return { enhancedPrompt: data[0].json.enhancedPrompt };
        }

        // Check for a direct `enhancedPrompt` key on the root object.
        if (data && typeof data.enhancedPrompt === 'string') {
            return { enhancedPrompt: data.enhancedPrompt };
        }
        
        // Check for a direct `output` key based on user feedback.
        if (data && typeof data.output === 'string') {
            return { enhancedPrompt: data.output };
        }

        // If no specific key is found, but we got a valid JSON response,
        // display the whole response to help the user debug their n8n workflow.
        return { enhancedPrompt: JSON.stringify(data, null, 2) };

    } catch (e) {
        // If JSON.parse fails, the response was likely plain text. Use the raw text.
        return { enhancedPrompt: responseText };
    }

  } catch (error) {
    console.error("Error enhancing prompt:", error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        // This specific error is often due to CORS issues or network problems.
        throw new Error('Network error or CORS issue. Please ensure the n8n webhook is correctly configured to accept requests from this origin.');
    }
    // Re-throw other errors so the UI component can display them.
    throw error;
  }
};