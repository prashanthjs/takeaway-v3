import { Schema, model } from 'mongoose';
import { CompanyType } from '@takeaway/common';

export const companyAddressModelSchema = new Schema({
  addressLine1: String,
  addressLine2: String,
  city: String,
  postCode: String,
  country: String,
});

export const companyConfigModelSchema = new Schema({
  systemPrompt: String,
  aiKey: String,
  whatsapp: {
    senderId: String,
    accessToken: String,
    verifyToken: String,
    apiVersion: String,
  },
});

export const companyModelSchema = new Schema<CompanyType>(
  {
    name: { type: String, unique: true },
    title: String,
    description: String,
    isActive: Boolean,
    logoUrl: String,
    address: companyAddressModelSchema,
    phoneNumber: String,
    email: String,
    website: String,
    isArchived: Boolean,
    _config: companyConfigModelSchema,
  },
  {
    timestamps: true,
    collection: 'companies',
  },
);

export const companyModel = model<CompanyType>('Company', companyModelSchema);
