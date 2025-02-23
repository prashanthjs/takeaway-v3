Generate the `branches` api in api app by following the `company` api structure

Guidelines: 
- Copy company.*.ts files to branch.*.ts - Rename all `company` strings to`branch`. maintian the casing and plural form
- Add filter by company id to get branches list

Fields & validations:

- _id: string, unique
- name: string, unique, required, max length 64, regex /^[a-z0-9_-]+$/i
- title: string, required, max length 64
- _companyId: string, required, reference to company model
- description: string, required, max length 256
- isActive: boolean, default true
- isArchived: boolean, default false
- createdAt: date, default now()
- updatedAt: date, default now() on update
- phoneNumber: string, required, max length 12
- email: string, required, email validation, max length 128
- address:
  - addressLine1: string, required, max length 64
  - addressLine2: string, required, max length 64
  - city: string, required, max length 32
  - postCode: string, required, max length 16
  - country: string, required, max length 32

database guidelines: - Company model should be referenced in branch model as _companyId 
- name, companyId should be unique
