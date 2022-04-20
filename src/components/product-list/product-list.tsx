import { FC, useCallback, useEffect, useState } from 'react'
import { useApiRequest } from '../../hooks/use-api-request'
import { IProduct, ProductTableData } from '../../utils'
import CustomTable from '../custom-table/custom-table'
import CustomButton from '../UI/custom-button'

const ProductList: FC = () => {

    const defaultProduct = { id: '', name: '', price: 0 }
    const productTableHeaders = ['Name', 'Price'] as const
    const apiRequest = useApiRequest()

    const [products, setProducts] = useState<IProduct[]>([])
    const [dataToShow, setDataToShow] = useState<ProductTableData[]>([])
    const [mode, setMode] = useState<'edit' | 'add'>('add')
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [currentProduct, setCurrentProduct] = useState<IProduct>(defaultProduct)
    const handleDeleteProduct = useCallback((productId) => setProducts(products.filter(({ id }) => id !== productId)), [setProducts])

    const handleEditProduct = useCallback((intermediary) => {
        setMode('edit')
        setOpenForm(true)
        setCurrentProduct(intermediary)
    }, [setMode])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await apiRequest<IProduct[]>({
                method: 'GET',
                url: '/products',
            });
            if (response) {
                setProducts(response)
                const dataToShow = response.map(({ id, name, price }) => ({ id, name, price }))
                setDataToShow(dataToShow);
            }
        }
        fetchProducts()
    }, [setProducts, apiRequest])

    return (
        <div className="flex flex-col items-center justify-between mt-20">
            {!openForm ? <><CustomButton text="Add Product" color="blue" hoverColor="pink" />
                <CustomTable tableData={dataToShow} headers={productTableHeaders} /> </> :
                //TODO: implement and add the component AddEditProductFrom
                <></>
            }
        </div>
    )
}

export default ProductList