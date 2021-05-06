import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayNameFilterPipe } from './array-name-filter.pipe';
@NgModule({
    imports: [CommonModule],
    declarations: [ArrayNameFilterPipe],
    exports: [ArrayNameFilterPipe]
})
export class PipesModule {}
