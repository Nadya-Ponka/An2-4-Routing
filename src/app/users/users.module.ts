import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './components';
import { UsersRoutingModule } from './users-routing.module';
import { UsersServicesModule } from './users-services.module';
import { UsersAPIProvider } from './users.config';

@NgModule({
  declarations: [UsersRoutingModule.components, UserComponent],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    UsersServicesModule
  ],
  providers: [
    UsersAPIProvider
]
})
export class UsersModule { }
