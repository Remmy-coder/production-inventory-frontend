import { IRawMaterialObject } from "./rawMaterials";

export interface ISupplierCreation {
  id?: string;
  name: string;
  country: string;
  state: string;
  address: string;
  website: string | null;
  companyId: string;
  supplierContactId?: string;
  firstName: string;
  lastName: string;
  email: string;
  dialcode: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISupplierObject {
  id?: string;
  name: string;
  country: string;
  state: string;
  address: string;
  website: string | null;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  supplierContact: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    dialcode: string;
    phoneNumber: string;
  };
  rawMaterials?: IRawMaterialObject;
}

export type ICreateSupplierFormValues = Omit<
  ISupplierCreation,
  "id" | "supplierContactId" | "companyId" | "createdAt" | "updatedAt"
>;
