import { Role } from '../model/role';
import { Grupa } from './grupa';
export class User {
    id: number;
    enabled: boolean;
    password: string;
    username: string;
    roleCollection: Role[];
    grupa: Grupa;
    grupaToString: string;
    roleCollectionToString: string;
}
