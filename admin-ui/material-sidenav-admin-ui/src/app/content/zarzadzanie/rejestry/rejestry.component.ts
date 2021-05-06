import { Component, OnInit, ViewChild } from '@angular/core';
import { RejestryService } from './rejestry.service';
import { Rejestry } from 'src/app/model/rejestry';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-rejestry',
  templateUrl: './rejestry.component.html',
  styleUrls: ['./rejestry.component.scss']
})
export class RejestryComponent implements OnInit {
rejestry: Rejestry [];
dataSource: MatTableDataSource<Rejestry>;
displayedColumns: string[] = ['id', 'akcja', 'obiekt', 'uzytkownik', 'data', 'uwagi'];
isLoadingResults = true;
isRateLimitReached = false;
akcjaFilter = new FormControl('');
idFilter = new FormControl('');
obiektFilter = new FormControl('');
uzytkownikFilter = new FormControl('');
dataFilter = new FormControl('');
uwagiFilter = new FormControl('');
allColumnsFilter = new FormControl('');

filterValues = {
    id: '',
    akcja: '',
    obiekt: '',
    uzytkownik: '',
    data: '',
    uwagi: '',
    topFilter: false,
    allColumnsFilter: ''
};

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private rejestryService: RejestryService) {
    setTimeout(() => {
      this.rejestryService.findAll().subscribe(data => {
        this.rejestry = data;
        this.dataSource = new MatTableDataSource(this.rejestry);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel = 'Wypisy: ';
        this.dataSource.filterPredicate = this.createFilter();
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
      });
    }, 350);
  }

  ngOnInit(): void {

  this.akcjaFilter.valueChanges
  .subscribe(
    akcja => {
      this.filterValues.akcja = akcja;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  );
  this.idFilter.valueChanges
  .subscribe(
    id => {
      this.filterValues.id = id;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  );
  this.obiektFilter.valueChanges
  .subscribe(
    obiekt => {
      this.filterValues.obiekt = obiekt;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  );
  this.uwagiFilter.valueChanges
  .subscribe(
    uwagi => {
      this.filterValues.uwagi = uwagi;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  );
  this.dataFilter.valueChanges
  .subscribe(
    data => {
      this.filterValues.data = data;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  );
  this.uzytkownikFilter.valueChanges
  .subscribe(
    uzytkownik => {
      this.filterValues.uzytkownik = uzytkownik;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  );
  this.allColumnsFilter.valueChanges
  .subscribe(
    allColumnsFilter => {
      this.filterValues.allColumnsFilter = allColumnsFilter;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  );
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
  }

  createFilter() {
   // tslint:disable-next-line:only-arrow-functions
   const myFilterPredicate = function(data: any, filter: string): boolean {
      const searchString = JSON.parse(filter);
      const akcjaFound = data.akcja.toString().trim().toLowerCase().indexOf(searchString.akcja.toLowerCase()) !== -1;
      const uzytkownikFound = data.uzytkownik.toString().trim().toLowerCase().indexOf(searchString.uzytkownik.toLowerCase()) !== -1;
      const obiektFound = data.obiekt.toString().trim().toLowerCase().indexOf(searchString.obiekt.toLowerCase()) !== -1;
      const dataFound = data.data.toString().trim().toLowerCase().indexOf(searchString.data.toLowerCase()) !== -1;
      const idFound = data.id.toString().trim().toLowerCase().indexOf(searchString.id.toLowerCase()) !== -1;

      if (!data.uwagi) {
       data.uwagi = '';
      }
      const uwagiFound = data.uwagi.toString().trim().toLowerCase().indexOf(searchString.uwagi.toLowerCase()) !== -1;

      const allColumnsFound = data.id.toString().trim().toLowerCase().indexOf(searchString.allColumnsFilter.toLowerCase()) !== -1
      || data.akcja.toString().trim().toLowerCase().indexOf(searchString.allColumnsFilter.toLowerCase()) !== -1
      || data.obiekt.toString().trim().toLowerCase().indexOf(searchString.allColumnsFilter.toLowerCase()) !== -1
      || data.uzytkownik.toString().trim().toLowerCase().indexOf(searchString.allColumnsFilter.toLowerCase()) !== -1
      || data.data.toString().trim().toLowerCase().indexOf(searchString.allColumnsFilter.toLowerCase()) !== -1
      || data.uwagi.toString().trim().toLowerCase().indexOf(searchString.allColumnsFilter.toLowerCase()) !== -1;


      if (searchString.topFilter) {
          return allColumnsFound || dataFound || uzytkownikFound || akcjaFound || obiektFound || uwagiFound || idFound;
      } else {
          return allColumnsFound && dataFound && uzytkownikFound && akcjaFound && obiektFound && uwagiFound && idFound;
      }
    };
   return myFilterPredicate;
  }

  myFormatDate(date: Date): string {
    return this.leftpad(date.getDate(), 2)
              + '-' + this.leftpad(date.getMonth() + 1, 2)
              + '-' + date.getFullYear()
              + ' ' + this.leftpad(date.getHours(), 2)
              + ':' + this.leftpad(date.getMinutes(), 2)
              + ':' + this.leftpad(date.getSeconds(), 2);
  }

  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
          + String(val)).slice(String(val).length);
  }
}
