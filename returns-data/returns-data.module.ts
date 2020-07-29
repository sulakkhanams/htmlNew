import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from 'app/shared/shared.module';
import { ReturnsDataComponent } from './returns-data.component';
import { ReturnsDataDetailComponent } from './returns-data-detail.component';
import { ReturnsDataUpdateComponent } from './returns-data-update.component';
import { ReturnsDataDeleteDialogComponent } from './returns-data-delete-dialog.component';
import { returnsDataRoute } from './returns-data.route';

@NgModule({
  imports: [IpanelSharedModule, RouterModule.forChild(returnsDataRoute)],
  declarations: [ReturnsDataComponent, ReturnsDataDetailComponent, ReturnsDataUpdateComponent, ReturnsDataDeleteDialogComponent],
  entryComponents: [ReturnsDataDeleteDialogComponent],
})
export class IpanelReturnsDataModule {}
