import { textBody, textArray } from '../../services/twilio/messages';
import statusList from './statusList';
import { checkAuth } from '../../utils';
import { sendText } from '../../services/twilio';
import { SuccessAndMessage } from '../../utils/types';

export default async (
  args: any,
  { models, currentUser }: { models: any; currentUser: any }
) => {
  checkAuth(currentUser);

  const { status, customer_order_id, special_order_id } = args;
  const { SpecialOrder, CustomerOrder } = models;

  if (!statusList.includes(status)) throw new Error('Invalid status');

  // Decide which model to use
  const Model = special_order_id ? SpecialOrder : CustomerOrder;
  const id = special_order_id ? special_order_id : customer_order_id;

  const order = await Model.query()
    .patch({ status })
    .where({ id })
    .returning('*')
    .first();

  const dbResponse: SuccessAndMessage = { success: true, message: order.id };

  //  Send twilio message if it is a matching status
  if (textArray.includes(status) && customer_order_id) {
    const textResponse = await sendText(textBody[status], order.phone);

    return {
      database: dbResponse,
      twilio: textResponse,
    };
  }

  // No text needed to be sent
  return {
    database: dbResponse,
    twilio: { success: false, message: 'No text needed to be sent' },
  };
};
