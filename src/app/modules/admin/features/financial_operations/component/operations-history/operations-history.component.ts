import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OperationHistoryService} from "../../../../../../core/service/operation-history.service";
import {PaginatedOperationHistory} from "../../../../../../core/model/paginated-history-model";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";


@Component({
    selector: 'app-operations-history',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatPaginatorModule],
    templateUrl: './operations-history.component.html',
    styleUrl: './operations-history.component.scss'
})
export class OperationsHistoryComponent implements OnInit {

    operations: PaginatedOperationHistory
    displayedColumns: string[] = ["type", "createdAt", "amount", "previousAmount", "nextAmount"];
    dataSource: MatTableDataSource<any>;

    constructor(private historyService: OperationHistoryService) {
    }

    ngOnInit(): void {
        this.getOperationHistory();
    }


    onPageChange(event: any): void {
        this.getOperationHistory(event.pageIndex, event.pageSize);
    }


    getOperationHistory(page: number = 0, size: number = 5, filter: string = "createdAt"): void {
        this.historyService.getOperationHistory(page, size, filter)
            .subscribe(
                (operation: PaginatedOperationHistory) => {

                    this.operations = operation;
                    console.log(this.operations);

                    this.dataSource = new MatTableDataSource<any>(operation.data["content"])


                },
                (error) => {
                }
            );
    }

}
