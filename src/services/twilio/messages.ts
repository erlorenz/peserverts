const processedText = (firstName: string): string =>
  `Hi ${firstName}, this is Press Express - we received your order! Make sure to drop your garments at the bell desk by the scheduled pickup time. Call us at 702-620-3315 or email us at support@pressexpresslv.com with any questions.`;

const pickedUpText = `Update from Press Express: Your items have been picked up.`;

const outForDeliveryText =
  'Update from Press Express: Your items are with the driver and will be delivered soon.';

const completedText =
  'Your items have been dropped off at the same location they were picked up. Thank you for choosing Press Express!';

interface TextBody {
  [key: string]: any;
  processed: any;
  picked_up: string;
  out_for_delivery: string;
  completed: string;
}

export const textBody: TextBody = {
  processed: processedText,
  picked_up: pickedUpText,
  out_for_delivery: outForDeliveryText,
  completed: completedText,
};

// Array of all the ones that actually send a text
export const textArray = ['picked_up', 'out_for_delivery', 'completed'];
