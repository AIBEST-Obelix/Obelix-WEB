import {RowData} from "@tanstack/table-core";
import {
    RankingInfo
} from '@tanstack/match-sorter-utils'
import {FilterFn} from "@tanstack/react-table";

declare module '@tanstack/table-core' {
    interface TableMeta<TData extends RowData> {
        providerId: string | undefined
    }
    
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    
    interface FilterMeta {
        itemRank: RankingInfo
    }
    
    interface ColumnMeta<TData extends RowData, TValue> {
        hidden: boolean
    }
}