import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: LandingPageComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), ],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
