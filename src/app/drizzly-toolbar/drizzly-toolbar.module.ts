import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DrizzlyToolbarComponent } from "./drizzly-toolbar.component";



@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],

    exports: [DrizzlyToolbarComponent],
    declarations: [DrizzlyToolbarComponent]
})
export class DrizzlyToolbarModule {
}