Generate the `order` api in api app by following the `company` api

Guidelines:

- Copy `company.*.ts` files to `order.*.ts` - Rename all `company` strings to `order`. maintain the casing and plural
  form
- similarly for `company.http` to `order.http`
- make sure to add `order.schema.ts` as an import in `common/schemas/index.ts`
- File names use `-` as seperator whereas strings in file use camel case

Fields & validations:

- \_id: string, unique
- \_companyId: string, required, reference to company model
- status: string
- invoiceNo: string
- type: string
- paymentType: string
- orderItems: Array
  - \_id: string, unique
  - name: string
  - type: string, required
  - refId: string
  - inItems: Array
    - \_id: string, unique
    - name: string
    - type: string, required
    - price: float
  - price: float, required
  - qty: integer, required
  - totalPrice: integer, required
- additionalItems: Array
  - \_id: string, unique
  - name: string
  - type: string, required
  - refId: string
- notes: string
- comments: string
- isCompleted: boolean
- isProcessing: boolean
- isCancelled: boolean
- isActive: boolean, default true
- isArchived: boolean, default false
- shippingAddress:
  - name: string
  - addressLine1: string
  - addressLine2: string
  - city: string
  - postcode: string
  - country: string
  - email: string
  - phoneNUmber: string
- deliveryAddress:
  - name: string
  - addressLine1: string
  - addressLine2: string
  - city: string
  - postcode: string
  - country: string
  - email: string
  - phoneNumber: string
- contactNumber: string
- userId: string
- contactName: string
- createdAt: date, default now()
- updatedAt: date, default now() on update
- total: float
- subTotal: float

database guidelines:

- name, companyId should be unique
