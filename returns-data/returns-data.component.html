<div>
    <h2 id="page-heading">
        <span>Returns Data</span>
    </h2>

    <div class="topnav">
        <a>search</a>
        <a>by</a>
        <a>date:</a>
        <input type="text" placeholder="dd/mm/yy" returnsData.dateOfReturn |'mediumDate'>
    </div>
    <br>
    <div class="topnav">
        <a>search</a>
        <a>by</a>
        <a>sales code:</a>
        <input type="text" placeholder="Search..">
    </div>
    <br>

    <jhi-alert-error></jhi-alert-error>

    <jhi-alert></jhi-alert>

    <div class="alert alert-warning" id="no-result" *ngIf="returnsData?.length === 0">
        <span>No returnsData found</span>
    </div>

    <div class="table-responsive" id="entities" *ngIf="returnsData && returnsData.length > 0">
        <table class="table table-striped" aria-describedby="page-heading">
            <thead>
            <tr jhiSort [(predicate)]="predicate" [(ascending)]="ascending" [callback]="reset.bind(this)">
                <th scope="col"  jhiSortBy="id"><span>ID</span> <fa-icon icon="sort"></fa-icon></th>
                <th scope="col"  jhiSortBy="dateOfReturn"><span>Date Of Return</span> <fa-icon icon="sort"></fa-icon></th>
                <th scope="col"  jhiSortBy="salesCode.id"><span>Sales Code</span> <fa-icon icon="sort"></fa-icon></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody infinite-scroll (scrolled)="loadPage(page + 1)" [infiniteScrollDisabled]="page >= links['last']" [infiniteScrollDistance]="0">
            <tr *ngFor="let returnsData of returnsData ;trackBy: trackId">
                <td><a [routerLink]="['/returns-data', returnsData.id, 'view']">{{ returnsData.id }}</a></td>
                <td>{{ returnsData.dateOfReturn | date:'mediumDate' }}</td>
                <td>
                    <div *ngIf="returnsData.salesCode">
                        <a [routerLink]="['/sales', returnsData.salesCode?.id, 'view']" >{{ returnsData.salesCode?.id }}</a>
                    </div>
                </td>
                <td class="text-right">
                    <div class="btn-group">
                        <button type="submit"
                                [routerLink]="['/returns-data', returnsData.id, 'view']"
                                class="btn btn-info btn-sm">
                            <fa-icon icon="eye"></fa-icon>
                            <span class="d-none d-md-inline">View</span>
                        </button>


                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
