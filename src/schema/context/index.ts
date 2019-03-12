import AdminUser from '../../models/AdminUser';
import CustomerOrder from '../../models/CustomerOrder';
import CustomerOrderItem from '../../models/CustomerOrderItem';
import SpecialOrder from '../../models/SpecialOrder';
import AdminComment from '../../models/AdminComment';
import AdminCommentDisplay from '../../models/AdminCommentDisplay';
import AdditionalCharge from '../../models/AdditionalCharge';
import Refund from '../../models/Refund';
import verifyToken from './verifyToken';
import logger from '../../config/winston';

export default async ({ req }: { req: any }) => {
  const context = {
    // Add Models to Context
    models: {
      AdminUser,
      CustomerOrder,
      SpecialOrder,
      CustomerOrderItem,
      AdminComment,
      AdminCommentDisplay,
      AdditionalCharge,
      Refund,
    },

    // User defaults to null
    currentUser: null,
  };

  // Verify token
  try {
    const currentUser = await verifyToken(req, AdminUser);

    // Add the verified user to the context
    context.currentUser = currentUser;
  } catch (e) {
    logger.warn(e.message);
  }

  return context;
};
