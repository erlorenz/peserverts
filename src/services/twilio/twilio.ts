import twilio from 'twilio';
import { twilioToken, twilioSID, twilioNumber } from '../../config/keys';
import { SuccessAndMessage } from '../../utils/types';

export const client = twilio(twilioSID, twilioToken);

export async function sendText(
  bodyText: string,
  toNumber: string
): Promise<SuccessAndMessage> {
  try {
    // Create and send the twilio message
    await client.messages.create({
      body: bodyText, // This is the message that will be sent
      to: toNumber, // Text this number
      from: twilioNumber, // From a valid Twilio number
    });
    return { success: true, message: 'Twilio Text Sent' };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

export function sendTextNoResponse(bodyText: string, toNumber: string): void {
  client.messages.create({
    body: bodyText,
    to: toNumber,
    from: twilioNumber,
  });
}
