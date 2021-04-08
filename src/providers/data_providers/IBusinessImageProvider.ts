import { BusinessInfoInput } from "../../models/data_models/types";

export interface IBusinessImageProvider {
    getBusinessImages(businessInfo: BusinessInfoInput)
}