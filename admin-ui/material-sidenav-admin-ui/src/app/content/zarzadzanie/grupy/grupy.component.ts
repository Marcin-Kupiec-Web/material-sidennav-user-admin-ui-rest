import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Grupa } from 'src/app/model/grupa';
import {GrupaService} from './grupy.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  grupa: Grupa;
  callback: string;
}

@Component({
  selector: 'app-zaklady',
  templateUrl: './grupy.component.html',
  styleUrls: ['./grupy.component.scss', '../../../app.component.scss']
})
export class GrupyComponent implements OnInit {
  grupy: Grupa[];
  zakladDelete: Grupa = null;
  zakladSave: Grupa = new Grupa();
  display = false;
  clonedZakladBefore: { [s: string]: Grupa; } = {};
  clonedZaklad: { [s: string]: Grupa } = {}; // primeng
  displayedColumns: string[] = ['id', 'name', 'shortName', 'description', 'akcja'];
  dataSource: MatTableDataSource<Grupa>;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private grupaService: GrupaService,
              public dialog: MatDialog, private overlay: Overlay) { }

  ngOnInit(): void {
    setTimeout(() => {this.grupaService.findAll().subscribe(data => {
      this.grupy = data;
      this.dataSource = new MatTableDataSource(this.grupy);
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

onRowEditAdd(grupa: Grupa) {
  if (grupa.name && grupa.shortName) {
     this.grupaService.addGrupa(grupa).subscribe(data => {
       this.grupy.push(data);
       this.dataSource = new MatTableDataSource(this.grupy);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
     this.zakladSave = new Grupa();
 }
}

onRowEditSave(grupa: Grupa) {

  if (grupa.name && grupa.shortName) {
      delete this.clonedZaklad[grupa.id];
      this.grupaService.updateGrupa(grupa).subscribe(data => {
          });
  }
}


onRowRemove(grupa: Grupa) {
  this.grupaService.removeGrupa(grupa).subscribe(data => {
    this.grupy = this.grupy.filter(r => r !== grupa);
    this.dataSource = new MatTableDataSource(this.grupy);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}


onRowEditInit(grupa: Grupa) {
  this.clonedZaklad[grupa.id] = grupa;
  const usBefore = Object.assign({}, grupa);
  this.clonedZakladBefore[grupa.id] = usBefore;
}


 // open dialog
 openDialog(modeEventDialog: Grupa): void {
  const dialogRef = this.dialog.open(DialogGroupComponent, {
    panelClass: 'dialogPanels',
    width: '55%',
    autoFocus: false,
    disableClose: true,
    scrollStrategy: this.overlay.scrollStrategies.noop(),
    data: {grupa: modeEventDialog, callback: null},
  });

  dialogRef.afterClosed().subscribe(result => {
  if (result){
    if (result.callback === 'zapisano') {
      this.onRowEditAdd(result.grupa);
    } else if (result.callback === 'uaktualniono') {
      this.onRowEditSave(result.grupa);
    } else if (result.callback === 'usun') {
      this.onRowRemove(result.grupa);
    }
  }
    // this.onRowEditSave(modeEventDialog);
  });

}

}


@Component({
  selector: 'app-dialog-group',
  templateUrl: 'app-dialog-group.html',
  styleUrls: ['./grupy.component.scss'],
})

export class DialogGroupComponent implements OnInit {
  private  clonedGrupaBefore: { [s: string]: Grupa; } = {};
  snackBarAction: string;
  snackBarValue: string;
  public groupForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogGroupComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      const usBefore = Object.assign({}, data.grupa);
      this.clonedGrupaBefore[data.grupa.id] = usBefore;
    }

    ngOnInit(): void {
      this.groupForm = new FormGroup({
        nameGroup: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        descGroup: new FormControl('', [Validators.maxLength(60)]),
        shortnameGroup: new FormControl('', [Validators.required, Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
       });
    }

  onNoClick(): void {
    this.data.grupa.name = this.clonedGrupaBefore[this.data.grupa.id].name;
    this.data.grupa.shortName = this.clonedGrupaBefore[this.data.grupa.id].shortName;
    this.dialogRef.close();
  }

  zapisz(): void {
    if (this.data.grupa.id) {
    this.data.callback = 'uaktualniono';
    this. snackBarAction = 'Aktualizacja';
    } else {
      this. snackBarAction = 'Dadawanie grupy';
      this.data.callback = 'zapisano';
    }

    if (this.data.grupa.name && this.data.grupa.shortName) {
      this.snackBarValue = 'sukces';
      } else {
        this.data.grupa.name = this.clonedGrupaBefore[this.data.grupa.id].name;
        this.data.grupa.shortName = this.clonedGrupaBefore[this.data.grupa.id].shortName;
        this.snackBarValue = 'błąd';
      }

  }

  usun(): void {
    this.data.callback = 'usun';
    this. snackBarAction = 'Usuwanie';
    this.snackBarValue = 'sukces';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: this.snackBarValue === 'błąd' ? ['mat-toolbar', 'mat-accent'] : ['mat-toolbar', 'mat-primary']
    });
  }
  compareWithFn(item1, item2) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

}
