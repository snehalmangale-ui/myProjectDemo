import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer, dataShareReducer } from './counter.reducer';
import { PromiseComponent } from './promise/promise.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RxjsOperatorsConceptsComponent } from './rxjs-operators-concepts/rxjs-operators-concepts.component';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { SubjectDemoComponent } from './subject-demo/subject-demo.component';
import { DirectiveDemoComponent } from './directive-demo/directive-demo.component';
import { CustomFocusDirective } from './directives/custom-focus.directive';
import { CustomDisplayDirective } from './directives/custom-display.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    PromiseComponent,
    RxjsOperatorsConceptsComponent,
    SwitchMapComponent,
    SubjectDemoComponent,
    DirectiveDemoComponent,
    CustomFocusDirective,
    CustomDisplayDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({count : counterReducer, dataModify : dataShareReducer}),
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
