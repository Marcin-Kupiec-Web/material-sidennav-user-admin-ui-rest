import { User } from '../model/user';
import { Privilege } from '../model/privilege';

export class Role {
    id: number;
    name: string;
    userCollection: User[];
    poziomUprawnien: number;
    privileges: Privilege[];
    privilegesString: string;

}
