Generate the `menu` api in api app by following the `company` api

Guidelines:

- Copy `company.*.ts` files to `menu.*.ts` - Rename all `company` strings to `menu`. maintain the casing and plural form
- similarly for `company.http` to `menu.http`
- make sure to add `menu.schema.ts` as an import in `common/schemas/index.ts`

Fields & validations:

- \_id: string, unique
- name: string, required, max length 32
- title: string, required, max length 32
- \_companyId: string, required, reference to company model
- isActive: boolean, default true
- isArchived: boolean, default false
- image: string, url, max length 256
- channel:string[]
- createdAt: date, default now()
- updatedAt: date, default now() on update

database guidelines:

- Company model should be referenced in menu model as \_companyId
- name, companyId should be unique
