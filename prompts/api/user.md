Generate the `user` api in api app by following the `company` api

Guidelines:

- Copy `company.*.ts` files to `user.*.ts` - Rename all `company` strings to `user`. maintain the casing and plural form
- similarly for `company.http` to `user.http`
- make sure to add `user.schema.ts` as an import in `common/schemas/index.ts`

Fields & validations:

- \_id: string, unique
- firstName: string, required, max length 32
- lastName: string, required, max length 32
- \_companyId: string, required, reference to company model
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

database guidelines:

- Company model should be referenced in user model as \_companyId
- email, companyId should be unique
