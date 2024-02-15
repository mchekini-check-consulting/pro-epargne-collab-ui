import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssetsHistoryService} from "../../../../../../core/service/assets-history.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {keys} from "lodash-es";
import {AssetsDisplay} from "../../../../../../core/model/assetsDisplay.model";

@Component({
    selector: 'app-assets-history-table',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    templateUrl: './assets-history-table.component.html',
    styleUrl: './assets-history-table.component.scss',
})
export class AssetsHistoryTableComponent implements OnInit {

    displayedColumns: string[] = ["plans", "supportLabel", "label", "sri"];
    displayedColumnsHeader: string[] = ["Plans", "Libellé du support", "Label", "SRI"];
    years: string[];
    dataSource = new MatTableDataSource<any>([]);
    assets: AssetsDisplay[];

    constructor(private assetsHistory: AssetsHistoryService) {
    }

    ngOnInit(): void {
        this.assetsHistory.getAssetsHistory().subscribe(response => {
            if (response.hasOwnProperty("data")) {
                this.dataSource = response['data'];
                this.years = this.getAssetYears();
                this.displayedColumns = this.displayedColumns.concat(this.years);
                this.displayedColumnsHeader = this.displayedColumnsHeader.concat(this.years);
                this.assets = this.dataToAssetsDisplay();
            }
        });
    }

    public getAssetYears(): string[] {
        return keys(this.dataSource[0].assetYearsData).reverse();
    }

    public dataToAssetsDisplay(): AssetsDisplay[] {
        let listOfTransformedAssets: AssetsDisplay[] = [];
        for (const index in this.dataSource) {
            let data = this.dataSource[index];
            const transformedData: AssetsDisplay = {
                plans: data.plans,
                supportLabel: data.supportLabel,
                label: data.label,
                sri: data.sri,
            };

            for (const year in data.assetYearsData) {
                if (Object.prototype.hasOwnProperty.call(data.assetYearsData, year)) {
                    transformedData[parseInt(year)] = data.assetYearsData[parseInt(year)]
                }
            }
            listOfTransformedAssets.push(transformedData);
        }
        return listOfTransformedAssets;
    }
}
