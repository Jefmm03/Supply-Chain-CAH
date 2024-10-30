import { ReactNode } from "react";

export interface ItemMasterDto {
    itemNumber: string;
    vendorName: string;
    comment: string;
    itemType: string;
    buyerCode: string;
    itemClass: string;
    leadTime: number;
    leadTimeInMonths: number;
    minimumBalance: number;
    allocation: number;
    totalAllocated: number;
    allocated_A: number;
    allocated_Q: number;
    allocated_QQ: number;
    allocated_C: number;
    allocated_H: number;
    unitMeasure: string;
    openPO_Calculation:number;  
  }
  
export interface User {
  id?: number;
  userName: string;
  userAccount: string;
  email: string;
  rol: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface DecodedToken {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  [key: string]: string | number | boolean; 
}

export interface ProtectedRouteProps{
  children: ReactNode;
}

export interface UserFormProps {
  userToEdit?: User | null;
  onSubmit: (user: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

export interface BOM {
  rowNumber: number;
  lvl: string;
  bprod: string;
  pardesc: string;
  bmwhs: string;
  bmbomm: string;
  bchld: string;
  idesc: string;
  ifeno: string;
  iums: string;
  iityp: string;
  iclas: string;
  matc: number;
  lossAllowedPercent: number;
  bqreq: number;
  grossUsage: number;
  mat: number;
  tlab: number;
  voh: number;
  foh: number;
}

export interface BOMModalProps {
  onSubmit: (itemNumber: string, dateSelected: string) => void;
  onClose: () => void;
}

export interface  BOMData {
  lvl: string;
  bprod: string;
  pardesc: string;
  bchld: string;
  idesc: string;
  grossUsage: number;
}