export enum Step {
  DATA = 1,
  COMPANY = 2,
  SOLUTION = 3
}

export interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  website: string;
  investment: string;
  painPoint: string;
}

export const INITIAL_DATA: FormData = {
  name: '',
  email: '',
  whatsapp: '',
  website: '',
  investment: '',
  painPoint: ''
};