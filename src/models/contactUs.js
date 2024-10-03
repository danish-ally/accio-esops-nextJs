import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  combinedPhoneNo: {
    type: String
  },
  question: {
    type: String,
  },
  message:{
    type: String
  },
  source:{
    type: String,
    default:"AccioEsop",
  },
  utm_source:{
    type: String,
    default:null,
  },
  utm_medium:{
    type: String,
    default:null,
  },
  utm_campaign:{
    type: String,
    default:null,
  },
  utm_content:{
    type: String,
    default:null,
  }
}, {
  timestamps: true
});

// Middleware to set combinedPhoneNo before saving
contactUsSchema.pre('save', function (next) {
  this.combinedPhoneNo = `${this.countryCode}${this.phone}`;
  next();
});

const ContactUs = mongoose.models.contactUs || mongoose.model('contactUs', contactUsSchema);

export default ContactUs;


