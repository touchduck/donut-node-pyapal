const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({

 // Transaction and notification-related variables
  business: String,
  charset: String,
  custom: String,
  ipn_track_id: String,
  notify_version: String,
  parent_txn_id: String,
  receipt_id: String,
  receiver_email: String,
  receiver_id: String,
  resend: String,
  residence_country: String,
  test_ipn: String,
  txn_id: String,
  txn_type: String,
  verify_sign: String,

  // Buyer information variables
  address_country: String,
  address_city: String,
  address_country_code: String,
  address_name: String,
  address_state: String,
  address_status: String,
  address_street: String,
  address_zip: String,
  contact_phone: String,
  first_name: String,
  last_name: String,
  payer_business_name: String,
  payer_email: String,
  payer_id: String,

  // Payment information variables
  auth_amount: String,
  auth_exp: String,
  auth_id: String,
  auth_status: String,
  echeck_time_processed: String,
  exchange_rate: String,
  fraud_management_pending_filters_x: String,
  invoice: String,
  item_namex: String,
  item_numberx: String,
  mc_currency: String,
  mc_fee: String,
  mc_gross: String,
  mc_gross_x: String,
  mc_handling: String,
  mc_shipping: String,
  mc_shippingx: String,
  memo: String,
  num_cart_items: String,
  option_name1: String,
  option_name2: String,
  option_selection1: String,
  option_selection2: String,
  payer_status: String,
  payment_date: String,
  payment_fee: String,
  payment_fee_x: String,
  payment_gross: String,
  payment_gross_x: String,
  payment_status: String,
  payment_type: String,
  pending_reason: String,
  protection_eligibility: String,
  quantity: String,
  reason_code: String,
  remaining_settle: String,
  settle_amount: String,
  settle_currency: String,
  shipping: String,
  shipping_method: String,
  tax: String,
  transaction_entity: String,

  // Subscription variables
  amount1: String,
  amount2: String,
  amount3: String,
  mc_amount1: String,
  mc_amount2: String,
  mc_amount3: String,
  password: String,
  period1: String,
  period2: String,
  period3: String,
  reattempt: String,
  recur_times: String,
  recurring: String,
  retry_at: String,
  subscr_date: String,
  subscr_effective: String,
  subscr_id: String,
  username: String,

  // original data
  original_data: String
});

PaymentSchema.virtual('date').get( () => {
  return this._id.getTimestamp();
});

mongoose.model('Payment', PaymentSchema);
