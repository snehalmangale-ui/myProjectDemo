import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectDemoComponent } from './subject-demo/subject-demo.component';

const routes: Routes = [
  {
    path: 'subjectDemo',
    component: SubjectDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
