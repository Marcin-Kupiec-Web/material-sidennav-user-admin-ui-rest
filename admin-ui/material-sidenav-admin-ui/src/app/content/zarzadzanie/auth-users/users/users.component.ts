import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { User } from '../../../../model/user';
import { UsersService } from './users.service';
import { Role } from '../../../../model/role';
import { GrupaService } from '../../grupy/grupy.service';
import { Grupa } from 'src/app/model/grupa';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  user: User;
  roles: Role[];
  grups: Grupa[];
  callback: string;
  password: string;
}

export interface RestData {
  rlm: Role[];
  usersList: User[];
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../../../../app.component.scss']
})
export class UsersComponent implements OnInit {
  grupy: Grupa[];
  users: User[];
  roles: Role[] = [];
  userSave: User = new User();
  restData: RestData | any;
  clonedUsers: { [s: string]: User; } = {}; // primeng
  clonedUsersBefore: { [s: string]: User; } = {};

  display = false;
   rePassword: string = null;
  userPassword: string = null;
  userDelete: User = null;
  roleCollectFilter = '';
  displayedColumns: string[] = ['id', 'username', 'grupaToString', 'roleCollectionToString', 'enabled', 'akcja'];
  dataSource: MatTableDataSource<User>;
  newUserSave = new User();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  enabled: { label: string; value: boolean; }[];
  messageService: any;

  constructor(private userService: UsersService, private grupaService: GrupaService,
              public dialog: MatDialog, private overlay: Overlay) {

  }

  ngOnInit() {setTimeout(() => {
    this.userService.findAll().subscribe(data => {
      this.restData = data;
      this.users = this.restData.usersList;
      this.roles = this.restData.rlm;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Wypisy: ';
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
  });
  }, 350);



              this.grupaService.findAll().subscribe(data => {
            this.grupy = data;
           });


              this.enabled = [
{ label: 'Tak', value: true },
{ label: 'Nie', value: false }
];
}



openDialog(modeEventDialog: User): void {
  const dialogRef = this.dialog.open(DialogUsersComponent, {
    panelClass: 'dialogPanels',
    width: '55%',
    autoFocus: false,
    disableClose: true,
    scrollStrategy: this.overlay.scrollStrategies.noop(),
    data: {user: modeEventDialog, roles: this.roles, grups: this.grupy, callback: null},
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result){
    if (result.callback === 'zapisano') {
      this.onRowEditAdd(result.user);
    } else if (result.callback === 'uaktualniono') {
      this.onRowEditSave(result.user);
    } else if (result.callback === 'usun') {
      this.onRowRemove(result.user);
    }
  }
    // this.onRowEditSave(modeEventDialog);
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

onRowEditSave(user: User) {
  if (user.username) {
      delete this.clonedUsers[user.id];

      this.userService.updateUser(user).subscribe(data => {
              user.grupaToString = data.grupaToString;
              user.roleCollectionToString = data.roleCollectionToString;
          });
  }
}

onRowEditAdd(user: User) {
  if (user.username && user.grupa && user.password && user.roleCollection) {
       this.userService.addUser(user).subscribe(data => {
       this.users.push(data);
       this.dataSource = new MatTableDataSource(this.users);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
       this.userSave = new User();
 }
}

 onRowRemove(user: User) {
  this.userService.removeUser(user).subscribe(data => {
    this.users = this.users.filter(r => r !== user);
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });

}

onRowEditCancel(user: User, index: number) {
  this.users[index] = this.clonedUsersBefore[user.id];
  delete this.clonedUsers[user.id];
  delete this.clonedUsersBefore[user.id];
}


}

@Component({
  selector: 'app-dialog-users',
  templateUrl: 'app-dialog-users.html',
  styleUrls: ['./users.component.scss'],
})

export class DialogUsersComponent implements OnInit {
 private  clonedUsersBefore: { [s: string]: User; } = {};
 snackBarAction: string;
 snackBarValue: string;
 public userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogUsersComponent>, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      const usBefore = Object.assign({}, data.user);
      this.clonedUsersBefore[data.user.id] = usBefore;
    }

    ngOnInit() {
      this.userForm = new FormGroup({
           nameUser: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
           passUser: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]),
           activUser: new FormControl(''),
           groupUser: new FormControl('', [Validators.required, Validators.required, Validators.maxLength(60)]),
           roleUser: new FormControl('', [Validators.required, Validators.required, Validators.maxLength(60)]),
          });
        }

  onNoClick(): void {
    this.noChange();
    this.dialogRef.close();
  }

  noChange() {
    this.data.user.username = this.clonedUsersBefore[this.data.user.id].username;
    this.data.user.enabled = this.clonedUsersBefore[this.data.user.id].enabled;
    this.data.user.grupa = this.clonedUsersBefore[this.data.user.id].grupa;
    this.data.user.grupaToString = this.clonedUsersBefore[this.data.user.id].grupaToString;
    this.data.user.password = this.clonedUsersBefore[this.data.user.id].password;
    this.data.user.roleCollection = this.clonedUsersBefore[this.data.user.id].roleCollection;
    this.data.user.roleCollectionToString = this.clonedUsersBefore[this.data.user.id].roleCollectionToString;
  }
  zapisz(): void {
    if (this.data.user.id) {
    this.data.callback = 'uaktualniono';
    this. snackBarAction = 'Aktualizacja';
    if (this.data.user.username) {
    this.snackBarValue = 'sukces';
    } else {
      this.noChange();
      this.snackBarValue = 'błąd';
    }
    } else {
      this.data.callback = 'zapisano';
      this. snackBarAction = 'Dodawanie użytkownika';
      if (this.data.user.username && this.data.user.grupa && this.data.user.password && this.data.user.roleCollection) {
      this.snackBarValue = 'sukces';
      } else {
        this.snackBarValue = 'błąd';
      }
    }
  }

  usun(): void {
    this.data.callback = 'usun';
    this. snackBarAction = 'Usuwanie';
    this.snackBarValue = 'sukces';
  }

  compareWithFn(item1, item2) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: this.snackBarValue === 'błąd' ? ['mat-toolbar', 'mat-accent'] : ['mat-toolbar', 'mat-primary']
    });
  }
}
