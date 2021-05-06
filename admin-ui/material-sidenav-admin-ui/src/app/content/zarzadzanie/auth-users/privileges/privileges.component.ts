import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Privilege } from '../../../../model/privilege';
import { PrivilegesService } from './privileges.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  privilege: Privilege;
  callback: string;
}


@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.scss', '../../../../app.component.scss']
})
export class PrivilegesComponent implements OnInit {
  privileges: Privilege[];
  privilegeSave: Privilege = new Privilege();
  restData: any[];
  clonedPrivileges: { [s: string]: Privilege; } = {};
  clonedPrivilegesBefore: { [s: string]: Privilege; } = {};
  privilegeDelete: Privilege = null;
  displayedColumns: string[] = ['id', 'name', 'akcja'];
  dataSource: MatTableDataSource<Privilege>;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private privilegesService: PrivilegesService,
              public dialog: MatDialog, private overlay: Overlay) { }

  ngOnInit() {
    setTimeout(() => {
      this.privilegesService.findAll().subscribe(data => {
        this.restData = data;
        // tslint:disable-next-line:no-string-literal
        this.privileges = this.restData['plm'];
        this.dataSource = new MatTableDataSource(this.privileges);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel = 'Wypisy: ';
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
   });
  }, 350);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(modeEventDialog: Privilege): void {
    const dialogRef = this.dialog.open(DialogPrivilegesComponent, {
      panelClass: 'dialogPanels',
      width: '55%',
      autoFocus: false,
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: {privilege: modeEventDialog, callback: null},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result){
        if (result.callback === 'zapisano') {
           this.onRowEditAdd(result.privilege);
       } else if (result.callback === 'uaktualniono') {
            this.onRowEditSave(result.privilege);
       } else if (result.callback === 'usun') {
        this.onRowRemove(result.privilege);
      }
    }
      // this.onRowEditSave(modeEventDialog);
    });
  }

  onRowEditAdd(privilege: Privilege) {
    if (privilege.name) {
       this.privilegesService.addPrivilege(privilege).subscribe(data => {
         this.privileges.push(data);
         this.dataSource = new MatTableDataSource(this.privileges);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
       });
       this.privilegeSave = new Privilege();
   }
 }

 onRowEditSave(privilege: Privilege) {

  if (privilege.name) {
            this.privilegesService.updatePrivilege(privilege).subscribe(data => {
          });
  }
}

onRowRemove(privilege: Privilege) {
  this.privilegesService.removePrivlege(privilege).subscribe(data => {
    this.privileges = this.privileges.filter(r => r !== privilege);
    this.dataSource = new MatTableDataSource(this.privileges);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}
}


@Component({
  selector: 'app-dialog-start',
  templateUrl: 'app-dialog-privileges.html',
  styleUrls: ['./privileges.component.scss'],
})

export class DialogPrivilegesComponent implements OnInit {

  private  clonedRoleBefore: { [s: string]: Privilege; } = {};
  snackBarAction: string;
  snackBarValue: string;
  public privilegeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogPrivilegesComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      const usBefore = Object.assign({}, data.privilege);
      this.clonedRoleBefore[data.privilege.id] = usBefore;
    }

    ngOnInit(): void {
      this.privilegeForm = new FormGroup({
        namePrivilege: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
       });
    }

  onNoClick(): void {
    this.data.privilege.name = this.clonedRoleBefore[this.data.privilege.id].name;
    this.dialogRef.close();
  }

  zapisz(): void {
    if (this.data.privilege.id) {
    this.data.callback = 'uaktualniono';
    this. snackBarAction = 'Aktualizacja';
    } else {
      this. snackBarAction = 'Dadawanie uprawnień';
      this.data.callback = 'zapisano';
    }
    if (this.data.privilege.name) {
      this.snackBarValue = 'sukces';
      } else {
        this.data.privilege.name = this.clonedRoleBefore[this.data.privilege.id].name;
        this.snackBarValue = 'błąd';
      }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: this.snackBarValue === 'błąd' ? ['mat-toolbar', 'mat-accent'] : ['mat-toolbar', 'mat-primary']
    });
  }
  usun(): void {
    this.data.callback = 'usun';
    this. snackBarAction = 'Usuwanie';
    this.snackBarValue = 'sukces';
  }

  compareWithFn(item1, item2) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

}

/*
import { Component, OnInit } from '@angular/core';
import { Privilege } from '../../../../model/privilege';
import {MessageService} from 'primeng/api';
import { PrivilegesService } from './privileges.service';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.scss', '../../../../app.component.scss'],
  providers: [MessageService]
})
export class PrivilegesComponent implements OnInit {
  privileges: Privilege[];
  restData: any[];
  display = false;
  privilegeSave: Privilege = new Privilege();
  clonedPrivileges: { [s: string]: Privilege; } = {};
  clonedPrivilegesBefore: { [s: string]: Privilege; } = {};
  privilegeDelete: Privilege = null;

  constructor(private privilegesService: PrivilegesService, private messageService: MessageService) { }

  ngOnInit() {
      this.privilegesService.findAll().subscribe(data => {
      this.restData = data;
      this.privileges = this.restData['plm'];
   });
  }
  showDialog() {
    this.display = true;
   }

   onRowEditSave(privilege: Privilege) {

    if (privilege.name) {
        delete this.clonedPrivileges[privilege.id];

              this.privilegesService.updatePrivilege(privilege).subscribe(data => {
            });
               this.messageService.add({severity: 'success', summary: 'Success', detail: 'Uaktualniono.'});
    } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Wymagana jest nazwa!'});
         }
  }

  onRowEditAdd(privilege: Privilege) {
    if (privilege.name) {
       this.privilegesService.addPrivilege(privilege).subscribe(data => {
         this.privileges.push(data);
       });
       this.privilegeSave = new Privilege();
       this.messageService.add({severity: 'success', summary: 'Success', detail: 'Zapisano nowe uprawnienie.'});
   } else {
     this.messageService.add({severity: 'error', summary: 'Error', detail: 'Nie zapisano! Dane niepełne.'});
   }
 }
 onRowEditCancel(privilege: Privilege, index: number) {
  this.privileges[index] = this.clonedPrivilegesBefore[privilege.id];
  delete this.clonedPrivileges[privilege.id];
  delete this.clonedPrivilegesBefore[privilege.id];
}
onRowEditInit(privilege: Privilege) {
  this.clonedPrivileges[privilege.id] = privilege;
  const usBefore = Object.assign({}, privilege);
  this.clonedPrivilegesBefore[privilege.id] = usBefore;
}

 onRowRemove(privilege: Privilege) {
  this.privilegesService.removePrivlege(privilege).subscribe(data => {
    this.privileges = this.privileges.filter(r => r !== privilege);
  });
  if (privilege) {
  this.messageService.add({severity: 'success', summary: 'Success', detail: 'Usunięto!'});
  }
}

showConfirm(privilege: Privilege) {
  this.privilegeDelete = privilege;
  this.messageService.clear();
  this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Czy chcesz usunąć?', detail: 'Zaakceptuj lub anuluj'});
}
onConfirm() {
if (this.privilegeDelete) {
this.onRowRemove(this.privilegeDelete);
}
this.messageService.clear('c');
this.privilegeDelete = null;
}

onReject() {
this.privilegeDelete = null;
this.messageService.clear('c');
this.messageService.add({severity: 'warn', summary: 'Zrezygnowałeś.', detail: ' Ok, nic się nie stało.'});
}

}
*/
