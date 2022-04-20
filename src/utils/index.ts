import axios from 'axios'

//PS: some properties were set to optional to avoid some compilation errors
export interface IIntermediary {
    id?: string
    creationDate?: string 
    name: string
    order: number
    type?: 'Range' | 'Dropdown' 
    from?: number
    to?: number
    step?: number
    options?: { option: string; value: string }[]
}
export interface IProduct {
    id: string
    name: string
    price: number
}
export interface IAddEditIntermediaryFormProps {
    mode: 'add' | 'edit'
    intermediary: IIntermediary
    onCancel: () => void
    onCreate?: (intermediary: IIntermediary) => void
    onSave?: (IIntermediary: IIntermediary) => void
}

export type IntermediaryTableData = {
    id?: string
    creationDate?: string 
    name: string
    order: number
}

export type ProductTableData = {
    id?: string
    name: string
    price: number
}
export interface ICustomTableProps {
    tableData: IntermediaryTableData[] | ProductTableData[]
    onDelete?: (id: string) => void 
    onEdit?: (id: string) => void
    headers: readonly string[]
}
export interface ICustomButtonProps {
    text: string
    color: string
    hoverColor?: string
    type?: 'button' | 'submit' | 'reset'
    handleClick?: () => void
}

export const routes = [
    { name: 'Intermediaries', path: '/intermediaries' },
    { name: 'Products', path: '/products' },
] as const

export const axiosClient = axios.create({
    baseURL: `http://localhost:4000`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export const formatDate = (date: Date): string => {
    const [, ...shortDate] = date.toDateString().split(' ')
    return `${shortDate.join(' ')} ${date.getHours()}:${date.getMinutes()} CEST`
}
