import { Model } from 'objection';

export default class CustomerOrderItem extends Model {
  static tableName = 'customer_order_item';

  static relationMappings = {
    customerOrder: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/../CustomerOrder`,
      join: {
        from: 'customer_order_item.order_id',
        to: 'customer_order.id',
      },
    },
  };
}
