import {AssetYearsModel} from "./assetYears.model";

export interface AssetsModel {
    plans: string,
    isin: string,
    supportLabel: string,
    managementCompany: string,
    assetYearsData: AssetYearsModel[],
    label: string,
    sri: number
}
