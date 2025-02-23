import mongoose from 'mongoose';

import { CompanyCreateType, CompanyListQueryType } from '@takeaway/common';

import { companyModel } from '@api/models/company.model';

function getCompanyListFilter({ query }: { query: CompanyListQueryType }) {
  const filter: Record<string, unknown> = {};

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ];
  }

  if (typeof query.isActive === 'boolean') {
    filter.isActive = query.isActive;
  }

  filter.isArchived = false;

  return filter;
}

export async function getCompanyList({ query }: { query: CompanyListQueryType }) {
  const pageOptions = {
    page: query.page ?? 1,
    limit: query.limit ?? 10,
  };
  const sortOptions = {
    sortField: query.sortField ?? 'createdAt',
    sortOrder: query.sortOrder ?? 'desc',
  };

  const companyList = await companyModel
    .find(getCompanyListFilter({ query }))
    .skip((pageOptions.page - 1) * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort([[sortOptions.sortField, sortOptions.sortOrder]]);

  return companyList;
}

export async function getCompanyCount({ query }: { query: CompanyListQueryType }) {
  const filter = getCompanyListFilter({ query });
  const count = await companyModel.countDocuments(filter);
  return count;
}

export async function getCompany({ companyId }: { companyId: string }) {
  const filters = mongoose.isValidObjectId(companyId) ? { _id: companyId } : { name: companyId };
  const company = await companyModel.findOne({ ...filters, isArchived: false });
  return company;
}

export async function createCompany({ company }: { company: CompanyCreateType }) {
  const newCompany = await companyModel.create({
    ...company,
    isArchived: false,
  });
  return newCompany;
}

export async function updateCompany({ companyId, company }: { companyId: string; company: CompanyCreateType }) {
  const filters = mongoose.isValidObjectId(companyId) ? { _id: companyId } : { name: companyId };
  const updatedCompany = await companyModel.findOneAndUpdate(
    { ...filters, isArchived: false },
    { ...company },
    { new: true, runValidators: true },
  );
  if (!updatedCompany) {
    throw new Error('Company not found or has been archived');
  }
  return updatedCompany;
}

export async function deleteCompany({ companyId }: { companyId: string }) {
  const filters = mongoose.isValidObjectId(companyId) ? { _id: companyId } : { name: companyId };
  const deletedCompany = await companyModel.findOneAndUpdate({ ...filters, isArchived: false }, { isArchived: true });
  return deletedCompany;
}
