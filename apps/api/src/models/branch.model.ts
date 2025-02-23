import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 64,
      match: /^[a-z0-9_-]+$/i,
    },
    title: {
      type: String,
      required: true,
      maxlength: 64,
    },
    _companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 256,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      maxlength: 12,
    },
    address: {
      addressLine1: {
        type: String,
        required: true,
        maxlength: 128,
      },
      addressLine2: {
        type: String,
        maxlength: 128,
      },
      city: {
        type: String,
        required: true,
        maxlength: 32,
      },
      postCode: {
        type: String,
        required: true,
        maxlength: 16,
      },
      country: {
        type: String,
        required: true,
        maxlength: 32,
      },
    },
  },
  {
    timestamps: true,
  },
);

// Create a compound unique index on name and companyId
branchSchema.index({ name: 1, _companyId: 1 }, { unique: true });

export const Branch = mongoose.model('Branch', branchSchema);
