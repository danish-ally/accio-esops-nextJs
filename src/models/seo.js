import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true
  },
  pageUrl: {
    type: String,
    unique: true,
    required: true
  },
  seoTitle: {
    type: String,
    required: true,
    maxlength: 60
  },
  seoDescription: {
    type: String,
    maxlength: 160
  },
  seoKeywords: {
    type: String,
  },
  ogTitle: {
    type: String,
  },
  ogUrl: {
    type: String
  },
  ogType: {
    type: String,
  },
  ogImageUrl:{
    type: String
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Inactive", "Active"],
  },
  googleJson: {
    type: mongoose.Schema.Types.Mixed,  // Allows for any JSON format or null
    default: null,
  },
  ogDescription:{
    type: String,
  }
}, {
  timestamps: true
});



const Seo = mongoose.models.Seo || mongoose.model("Seo", seoSchema);

export default Seo;




// import mongoose from "mongoose";

// const updateHistorySchema = new mongoose.Schema({
//   version: { type: Number, required: true },
//   updatedFields: {
//     type: {
//       pageName: String,
//       pageUrl: String,
//       seoTitle : String,
//       seoDescription : String,
//       seoKeywords : String,
//       ogTitle: String,
//       ogUrl: String,
//       ogType: String,
//       ogImageUrl : String,
//       status :String
//     },
//   },
//   updatedAt: { type: Date, default: Date.now },
// });

// const seoSchema = new mongoose.Schema(
//   {
//     pageName: {
//       type: String,
//       required: true
//     },
//     pageUrl: {
//       type: String,
//       unique: true,
//       required: true
//     },
//     seoTitle: {
//       type: String,
//       required: true,
//       maxlength: 60
//     },
//     seoDescription: {
//       type: String,
//       required: true,
//       maxlength: 60
//     },
//     seoKeywords: {
//       type: String,
//       required: true
//     },
//     ogTitle: {
//       type: String,
//       required: true
//     },
//     ogUrl: {
//       type: String,
//       unique: true,
//       required: true
//     },
//     ogType: {
//       type: String,
//       required: true
//     },
//     ogImageUrl:{
//       type: String,
//       unique: true,
//       required: true
//     },
//     status: {
//       type: String,
//       default: "active",
//       enum: ["inactive", "active"],
//     },
//     version: {
//       type: Number,
//       default: 1,
//     },
//     updateHistory: [updateHistorySchema],
//   },
//   {
//     timestamps: true,
//   }
// );

// seoSchema.methods.trackUpdate = function (version, updatedFields) {
//   version = parseInt(version, 10);
//   if (isNaN(version)) {
//     throw new Error('Invalid version number');
//   }

//   this.updateHistory.push({
//     version,
//     updatedFields,
//     updatedAt: new Date(),
//   });
// };

// const Seo = mongoose.models.Seo || mongoose.model("Seo", seoSchema);

// export default Seo;