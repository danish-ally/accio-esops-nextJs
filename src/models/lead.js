import mongoose from 'mongoose';

const acioleadSchema = new mongoose.Schema({
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
  businessSector: {
    type: String,
    required: true
  },
  companySize: {
    type: String,
    required: true
  },
  wantDemo: {
    type: Boolean,
    required: true
  },
  scheduleDate: {
    type: Date,
    default: null
  },
  leadsDescription:{
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
acioleadSchema.pre('save', function (next) {
  this.combinedPhoneNo = `${this.countryCode}${this.phone}`;
  next();
});

const AcioLead = mongoose.models.AcioLead || mongoose.model('AcioLead', acioleadSchema);



export default AcioLead;

// import mongoose from 'mongoose';

// const versionSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: String,
//     countryCode: String,
//     phone: String,
//     combinedPhoneNo: String,
//     businessSector: String,
//     companySize: Number,
//     scheduleDate: Date,
//   },
//   { timestamps: true }
// );

// const acioleadSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     countryCode: { type: String, required: true },
//     phone: { type: String, required: true },
//     combinedPhoneNo: String,
//     businessSector: { type: String, required: true },
//     companySize: { type: Number, required: true },
//     scheduleDate: Date,
//     versions: [versionSchema],
//   },
//   { timestamps: true }
// );

// // Middleware to create a new version before saving an update
// acioleadSchema.pre('save', function (next) {
//   this.combinedPhoneNo = `${this.countryCode}${this.phone}`;

//   const version = {
//     name: this.name,
//     email: this.email,
//     countryCode: this.countryCode,
//     phone: this.phone,
//     combinedPhoneNo: this.combinedPhoneNo,
//     businessSector: this.businessSector,
//     companySize: this.companySize,
//     scheduleDate: this.scheduleDate,
//   };

//   this.versions.push(version);
//   next();
// });

// const AcioLead = mongoose.model('AcioLead', acioleadSchema);

// export default AcioLead;

