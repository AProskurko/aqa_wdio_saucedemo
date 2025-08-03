export interface UserData {
    firstName: string; 
    lastName: string; 
    postalCode: number;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface FooterLinks {
    name: string;
    url: string;
}

export interface FilterResults {
  az: string;
  za: string;
  lohi: string;
  hilo: string;
}