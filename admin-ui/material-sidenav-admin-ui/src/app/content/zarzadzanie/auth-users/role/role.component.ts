import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { RoleService } from './role.service';
import { Role } from '../../../../model/role';
import { Privilege } from '../../../../model/privilege';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  rola: Role;
  privilege: Privilege[];
  callback: string;
}

export interface RestData {
  rlm: Role[];
  plm: Privilege[];
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss', '../../../../app.component.scss'],
})

export class RoleComponent implements OnInit {
  roles: Role[];
  restData: RestData | any;
  rolaSave: Role = new Role();
  privilegesSave: Privilege[];
  privilegeCollectFilter = '';
  newRoleSave = new Role();
  displayedColumns: string[] = ['id', 'name', 'poziomUprawnien', 'privilegesString', 'akcja'];
  dataSource: MatTableDataSource<Role>;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private roleService: RoleService,
              public dialog: MatDialog, private overlay: Overlay) { }

        ngOnInit() {
          setTimeout(() => {this.roleService.findAll().subscribe(data => {
          this.restData = data;
          this.roles = this.restData.rlm;
          this.privilegesSave = this.restData.plm;
          this.dataSource = new MatTableDataSource(this.roles);
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


     onRowEditAdd(rola: Role) {
       if (rola.name && rola.poziomUprawnien && rola.privileges) {
          this.roleService.addRola(rola).subscribe(data => {
            this.roles.push(data);
            this.dataSource = new MatTableDataSource(this.roles);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          this.rolaSave = new Role();
      }
    }

    onRowEditSave(rola: Role) {

      if (rola.name) {

                this.roleService.updateRola(rola).subscribe(data => {
                  rola.privilegesString = data.privilegesString ;
              });
      }
    }

    onRowRemove(rola: Role) {
      this.roleService.removeRola(rola).subscribe(data => {
        this.roles = this.roles.filter(r => r !== rola);
        this.dataSource = new MatTableDataSource(this.roles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }


  // open dialog
  openDialog(modeEventDialog: Role): void {
    const dialogRef = this.dialog.open(DialogStartComponent, {
      panelClass: 'dialogPanels',
      width: '55%',
      autoFocus: false,
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: {rola: modeEventDialog, privilege: this.privilegesSave, callback: null},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result){
      if (result.callback === 'zapisano') {
        this.onRowEditAdd(result.rola);
      } else if (result.callback === 'uaktualniono') {
        this.onRowEditSave(result.rola);
      } else if (result.callback === 'usun') {
        this.onRowRemove(result.rola);
      }
    }
      // this.onRowEditSave(modeEventDialog);
    });
  }
}




@Component({
  selector: 'app-dialog-start',
  templateUrl: 'app-dialog-role.html',
  styleUrls: ['./role.component.scss'],
})

export class DialogStartComponent implements OnInit {

  private  clonedRoleBefore: { [s: string]: Role; } = {};
  snackBarAction: string;
  snackBarValue: string;
  public roleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogStartComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      const usBefore = Object.assign({}, data.rola);
      this.clonedRoleBefore[data.rola.id] = usBefore;
    }

    ngOnInit(): void {
      this.roleForm = new FormGroup({
        nameRole: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        poziomUprawnienRole: new FormControl('', [Validators.required,
                                                  Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                                                  Validators.maxLength(2)]),
        priviliegesRole: new FormControl('', [Validators.required, Validators.required, Validators.maxLength(60)]),
       });
    }

  onNoClick(): void {
    this.nochange();
    this.dialogRef.close();
  }

  nochange() {
    this.data.rola.name = this.clonedRoleBefore[this.data.rola.id].name;
    this.data.rola.poziomUprawnien = this.clonedRoleBefore[this.data.rola.id].poziomUprawnien;
    this.data.rola.privileges = this.clonedRoleBefore[this.data.rola.id].privileges;
    this.data.rola.privilegesString = this.clonedRoleBefore[this.data.rola.id].privilegesString;
  }
  zapisz(): void {
    if (this.data.rola.id) {
    this.data.callback = 'uaktualniono';
    this. snackBarAction = 'Aktualizacja';
    } else {
      this.data.callback = 'zapisano';
      this. snackBarAction = 'Ddano rolę';
    }
    if (this.data.rola.name && !isNaN(this.data.rola.poziomUprawnien)) {
      this.snackBarValue = 'sukces';
      } else {
        this.nochange();
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
  }

  compareWithFn(item1, item2) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

}
