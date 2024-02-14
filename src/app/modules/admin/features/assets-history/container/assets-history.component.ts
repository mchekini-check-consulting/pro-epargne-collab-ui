import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsHistoryTableComponent } from '../components/assets-history-table/assets-history-table.component';
import { SimulatorComponent } from '../components/simulator/simulator.component';

@Component({
    selector: 'app-assets-history',
    standalone: true,
    templateUrl: './assets-history.component.html',
    styleUrl: './assets-history.component.scss',
    imports: [CommonModule, AssetsHistoryTableComponent, SimulatorComponent],
})
export class AssetsHistoryComponent {}
