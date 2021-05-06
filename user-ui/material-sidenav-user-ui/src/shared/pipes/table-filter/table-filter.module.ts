import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilter } from './table-filter.pipe';
@NgModule({
    imports: [CommonModule],
    declarations: [TableFilter],
    exports: [TableFilter]
})
export class TableFilterModule {}
