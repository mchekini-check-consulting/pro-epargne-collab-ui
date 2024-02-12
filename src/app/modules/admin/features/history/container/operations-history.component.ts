import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OperationHistoryService} from "../../../../../core/service/operation-history.service";
import {PaginatedOperationHistory} from "../../../../../core/model/paginated-history-model";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatSort, MatSortModule, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";


@Component({
    selector: 'app-operations-history',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSelectModule, ReactiveFormsModule, MatSortModule],
    templateUrl: './operations-history.component.html',
    styleUrl: './operations-history.component.scss'
})
export class OperationsHistoryComponent implements OnInit, AfterViewInit {

    operations: PaginatedOperationHistory
    displayedColumns: string[] = ["type", "createdAt", "previousAmount", "amount", "nextAmount"];
    dataSource: MatTableDataSource<any>;

    filtre: string = "";

    typeControl = new FormControl("");
    operationTypes = [
        {value: '', name: 'Tous les types'},
        {value: 'CONTRIBUTION', name: 'Abondement'},
        {value: 'WITHDRAWAL', name: 'Retrait'},
        {value: 'INTEREST', name: 'Règlement de l’intéressement'},
        {value: 'PARTICIPATION', name: 'Règlement de la participation'},
        {value: 'DEPOSIT', name: 'Versement volontaire'},
        {value: 'TIME', name: 'Versement d’un compte épargne temps'}]


    constructor(private historyService: OperationHistoryService, private _liveAnnouncer: LiveAnnouncer) {


    }

    ngOnInit(): void {
        this.getOperationHistory();
    }


    onPageChange(event: any): void {
        this.getOperationHistory(event.pageIndex, event.pageSize, this.filtre);
    }

    onFilter(filter: string): void {
        this.filtre = filter;
        this.getOperationHistory(0, 10, filter);
    }


    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    announceSortChange(sortState: Sort) {
        this.dataSource.sort = this.sort;
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }


    getOperationHistory(page: number = 0, size: number = 5, filter: string = "", sort?): void {
        this.historyService.getOperationHistory(page, size, filter, sort)
            .subscribe(
                (operation: PaginatedOperationHistory) => {

                    this.operations = operation;
                    this.dataSource = new MatTableDataSource<any>(operation.data["content"])

                },
                (error) => {
                }
            );
    }


}
