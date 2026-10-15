import type {BaseRecord, DataProvider, GetListParams, GetListResponse,} from "@refinedev/core";
import {mockSubjects} from "@/customeProvider/moc-data.ts";

export const dataProviders: DataProvider = {
    getList: async <TData extends BaseRecord = BaseRecord>({
                                                               resource,
                                                           }: GetListParams): Promise<GetListResponse<TData>> => {
        if (resource !== "subjects") {
            return {
                data: [],
                total: 0,
            };
        }

        return {
            data: mockSubjects as unknown as TData[],
            total: mockSubjects.length,
        };
    },
    getOne: () => {
        throw new Error('this data are not exist in moc')
    },
    create: () => {
        throw new Error('this data are not exist in moc')
    },
    update: () => {
        throw new Error('this data are not exist in moc')
    },
    deleteOne: () => {
        throw new Error('this data are not exist in moc')
    },
    getApiUrl: () => ''

};
