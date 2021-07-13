import { CustomerToken } from "./customer-token";

export interface DataToken {
    token: string;
    expiration: Date;
    user: CustomerToken;
}
