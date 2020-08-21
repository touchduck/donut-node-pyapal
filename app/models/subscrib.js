const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscribSchema = new Schema({

  mc_gross: String,
  protection_eligibility: String,
  address_status: String,
  payer_id: String,
  tax: String,
  address_street: String,
  payment_date: String,
  payment_status: String,
  charset: String,
  address_zip: String,
  first_name: String,
  mc_fee: String,
  address_country_code: String,
  address_name: String,
  notify_version: String,
  custom: String,
  payer_status: String,
  business: String,
  address_country: String,
  address_city: String,
  quantity: String,
  verify_sign: String,
  payer_email: String,
  txn_id: String,
  payment_type: String,
  btn_id: String,
  last_name: String,
  address_state: String,
  receiver_email: String,
  payment_fee: String,
  shipping_discount: String,
  insurance_amount: String,
  receiver_id: String,
  txn_type: String,
  item_name: String,
  discount: String,
  mc_currency: String,
  item_number: String,
  residence_country: String,
  test_ipn: String,
  shipping_method: String,
  handling_amount: String,
  transaction_subject: String,
  payment_gross: String,
  shipping: String,
  ipn_track_id: String,
  
  subscr_id: String,
  recurring: String,
  mc_amount3: String,
  reattempt: String,
  subscr_date: String,
  period3: String,
  
  original_data: String
});

SubscribSchema.virtual('date').get( () => {
  return this._id.getTimestamp();
});

mongoose.model('Subscrib', SubscribSchema);
