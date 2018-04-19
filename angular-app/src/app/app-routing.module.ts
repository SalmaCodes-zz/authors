import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { QuotesComponent } from './quotes/quotes.component';
import { WriteComponent } from './write/write.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'new', component: NewComponent },
  { path: 'edit/:id', component: EditComponent},
  { path: 'quotes/:id', component: QuotesComponent},
  { path: 'write/:id', component: WriteComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
