Generate the `menuItem` api in api app by following the `company` api

Guidelines:

- Copy `company.*.ts` files to `menu-item.*.ts` - Rename all `company` strings to `menuItem`. maintain the casing and
  plural form
- similarly for `company.http` to `menu-item.http`
- make sure to add `menu-item.schema.ts` as an import in `common/schemas/index.ts`
- File names use `-` as seperator whereas strings in file use camel case

Fields & validations:

- \_id: string, unique
- name: string, required, max length 32
- title: string, required, max length 32
- \_companyId: string, required, reference to company model
- \_menuId: string, required, reference to menu model
- \_menuCategoryId: string[], reference to menuCategory model
- description: string, optional
- isActive: boolean, default true
- isArchived: boolean, default false
- image: string, url, max length 256
- createdAt: date, default now()
- updatedAt: date, default now() on update
- price: float
- maxQuantity: Integer, default 999
- availableQty: Integer, default 999

database guidelines:

- name, companyId should be unique
