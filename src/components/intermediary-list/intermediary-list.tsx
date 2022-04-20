import { FC, useCallback, useEffect, useState } from 'react'
import { useApiRequest } from '../../hooks/use-api-request'
import { formatDate, IIntermediary, IntermediaryTableData } from '../../utils'
import AddEditIntermediaryForm from '../add-edit-intermediary-form/add-edit-intermediary-form'
import CustomTable from '../custom-table/custom-table'
import CustomButton from '../UI/custom-button'

const IntermediaryList: FC = () => {
    const defaultIntermediary: IIntermediary = {
        id: '',
        name: '',
        order: 0,
        type: 'Range',
        from: 0,
        to: 0.0,
        step: 0.0,
        options: [],
    }
    const intermediaryTableHeaders = ['Created at', 'Name', 'Order'] as const
    const apiRequest = useApiRequest()

    const [intermediaries, setIntermediaries] = useState<IIntermediary[]>([])
    const [dataToShow, setDataToShow] = useState<IntermediaryTableData[]>([])
    const [mode, setMode] = useState<'add' | 'edit'>('add')
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [currentIntermediary, setCurrentIntermediary] =
        useState<IIntermediary>(defaultIntermediary)

    const openAddIntermediaryForm = useCallback(() => {
        setMode('add')
        setOpenForm(true)
    }, [setMode])

    const openEditIntermediaryForm = useCallback(
        (intermediaryId: string) => {
            setMode('edit')
            setOpenForm(true)
            const intermediaryToEdit = intermediaries.find(
                ({ id }) => id === intermediaryId
            )
            setCurrentIntermediary(intermediaryToEdit!)
        },
        [setMode, setCurrentIntermediary, intermediaries]
    )

    const handleExitForMModal = useCallback(() => {
        setOpenForm(false)
    }, [])

    const handleAddIntermediary = useCallback(
        async (intermediary: IIntermediary) => {
            const creationDate = formatDate(new Date())
            const newIntermediary = { ...intermediary, creationDate }
            await apiRequest<IIntermediary>({
                method: 'post',
                url: '/intermediaries',
                data: newIntermediary,
            })
            setOpenForm(false)
        },
        [setOpenForm, apiRequest]
    )

    // Wasn't assigned to onSave because it causes a strange bug
    const handleEditIntermediary = useCallback(
        async (intermediary: IIntermediary) => {
            await apiRequest<IIntermediary>({
                method: 'put',
                url: `/intermediaries/${intermediary.id}`,
                data: intermediary,
                params: intermediary.id
            })
            setOpenForm(false)
        },
        [setOpenForm, apiRequest]
    )

    //TODO: implement a confirmation modal before deleting an intermediary
    const handleDeleteIntermediary = useCallback(
        async (intermediaryId: string) => {
            await apiRequest<IIntermediary>({
                method: 'delete',
                url: `/intermediaries/${intermediaryId}`,
            })
        },
        [apiRequest]
    )

    useEffect(() => {
        const fetchIntermediaries = async () => {
            const response = await apiRequest<IIntermediary[]>({
                method: 'GET',
                url: '/intermediaries',
            })
            if (response) {
                setIntermediaries(response)
                const dataToShow = response.map(
                    ({ id, creationDate, name, order }) => ({
                        id,
                        creationDate,
                        name,
                        order,
                    })
                )
                setDataToShow(dataToShow)
            }
        }
        fetchIntermediaries()
    }, [setIntermediaries, apiRequest])
    // TODO: add a message of 'No available Data' if the intermediaries list is empty
    return (
        <div className="flex flex-col items-center justify-between mt-20">
            {!openForm ? (
                <>
                    <CustomButton
                        text="Add Intermediary"
                        color="blue"
                        hoverColor="pink"
                        handleClick={openAddIntermediaryForm}
                    />
                    <CustomTable
                        tableData={dataToShow}
                        headers={intermediaryTableHeaders}
                        onDelete={handleDeleteIntermediary}
                        onEdit={openEditIntermediaryForm}
                    />{' '}
                </>
            ) : (
                <AddEditIntermediaryForm
                    mode={mode}
                    intermediary={currentIntermediary}
                    onCancel={handleExitForMModal}
                    onCreate={handleAddIntermediary}
                />
            )}
        </div>
    )
}

export default IntermediaryList
