import { BranchCreateType, BranchListQueryType, BranchUpdateType } from '@takeaway/common';
import { Branch } from '@api/models/branch.model';

export const getBranchCount = async ({ query }: { query: BranchListQueryType }) => {
  const filter: any = {};
  
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { title: { $regex: query.search, $options: 'i' } },
    ];
  }

  if (query.isActive !== undefined) {
    filter.isActive = query.isActive;
  }

  if (query.companyId) {
    filter._companyId = query.companyId;
  }

  return Branch.countDocuments(filter);
};

export const getBranchList = async ({ query }: { query: BranchListQueryType }) => {
  const filter: any = {};
  
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { title: { $regex: query.search, $options: 'i' } },
    ];
  }

  if (query.isActive !== undefined) {
    filter.isActive = query.isActive;
  }

  if (query.companyId) {
    filter._companyId = query.companyId;
  }

  const skip = (query.page - 1) * query.limit;

  return Branch.find(filter)
    .sort({ [query.sortField]: query.sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(query.limit);
};

export const getBranch = async ({ branchId }: { branchId: string }) => {
  return Branch.findById(branchId);
};

export const createBranch = async ({ data }: { data: BranchCreateType }) => {
  const branch = new Branch(data);
  return branch.save();
};

export const updateBranch = async ({
  branchId,
  data,
}: {
  branchId: string;
  data: BranchUpdateType;
}) => {
  return Branch.findByIdAndUpdate(branchId, data, { new: true });
};

export const deleteBranch = async ({ branchId }: { branchId: string }) => {
  return Branch.findByIdAndDelete(branchId);
};
