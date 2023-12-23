export interface ICompanyRegistration {
  id: string;
  name: string;
  email: string;
  country: string;
  state: string;
  address: string;
}

export interface ICompanyObject {
  id: string;
  name: string;
  email: string;
  country: string;
  state: string;
  address: string;
  activationStatus: string;
  activationToken: string | null;
  activationDate: string | null;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}
