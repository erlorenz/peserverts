import updateStatusController from '../../actions/updateStatus';

export const Mutation = {
  updateStatus(_, args, context) {
    return updateStatusController(args, context);
  },
};
