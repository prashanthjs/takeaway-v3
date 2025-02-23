Generate the `menuCategory` api in api app by following the `company` api

Guidelines:

- Copy `company.*.ts` files to `menu-category.*.ts` - Rename all `company` strings to `menuCategory`. maintain the
  casing and plural form
- similarly for `company.http` to `menu-category.http`
- make sure to add `menu-category.schema.ts` as an import in `common/schemas/index.ts`
- File names use `-` as seperator whereas strings in file use camel case

Fields & validations:

- \_id: string, unique
- name: string, required, max length 32
- title: string, required, max length 32
- \_companyId: string, required, reference to company model
- \_menuId: string, required, reference to menu model
- description: string, optional
- isActive: boolean, default true
- isArchived: boolean, default false
- image: string, url, max length 256
- createdAt: date, default now()
- updatedAt: date, default now() on update

database guidelines:

- Company model should be referenced in menuCategory model as \_companyId
- Menu model should be referenced in menuCategory model as \_menuId
- name, companyId should be unique
