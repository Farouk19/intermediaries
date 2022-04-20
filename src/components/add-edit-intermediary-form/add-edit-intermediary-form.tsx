import { FC, useState, useCallback, ChangeEvent, useEffect, useMemo } from 'react'
import { IAddEditIntermediaryFormProps, IIntermediary } from '../../utils'
import CustomButton from '../UI/custom-button'
import './add-edit-intermediary-form.css'

const AddEditIntermediaryForm: FC<IAddEditIntermediaryFormProps> = ({ mode, intermediary, onCancel, onSave, onCreate }) => {

    const intermediaryTypes = ['Range', 'Dropdown'] as const
    const { from, order, to, step } = intermediary
    const validationErrors = useMemo(() => new Map<string, string[]>(), []);

    const [intermediaryInputValues, setIntermediaryInputValues] = useState<{ [key: string]: number | undefined }>({ from, order, to, step })
    const [intermediaryType, setIntermediaryType] = useState<string | undefined>(intermediary.type)
    const [name, setName] = useState<string>(intermediary.name)

    const validateFromValue = useCallback((fromInputValue: string) => {
        const fromValidationErrors: string[] = []
        const fromValue = +fromInputValue
        if (mode === 'edit') {
            if (from !== 0 && fromValue >= from!) {
                fromValidationErrors.push('From value can be only decreased when editing it')
            }
            if (from! % (fromValue * step!) !== 0) {
                fromValidationErrors.push('(Last From value) % ((New From value) * step) should be = 0')
            }
        }
        if (fromValue > to!) {
            fromValidationErrors.push('From value must be < To value')
        }
        validationErrors.set('from', fromValidationErrors)
    }, [validationErrors, from, mode, step, to])

    const validateStepValue = useCallback((stepInputValue: string) => {
        const stepValidationErrors: string[] = []
        const stepValue = +stepInputValue
        if (stepValue < 0) {
            stepValidationErrors.push('Please enter a positive value')
        }
        validationErrors.set('step', stepValidationErrors)
    }, [validationErrors])


    const handleIntermediaryInputValuesChanges = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setIntermediaryInputValues((intermediaryInputValues) => ({ ...intermediaryInputValues, [event.target.name]: +(event.target.value) }))
    }, [setIntermediaryInputValues])

    const handleFromChanges = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        validateFromValue(e.target.value)
        setIntermediaryInputValues((intermediaryInputValues) => ({ ...intermediaryInputValues, from: +(e.target.value) }))
    }, [validateFromValue, setIntermediaryInputValues])

    const handleStepChanges = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        validateStepValue(e.target.value)
        setIntermediaryInputValues({ ...intermediaryInputValues, step: +(e.target.value) })
    }, [intermediaryInputValues, validateStepValue])

    const handleIntermediaryTypeChanges = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setIntermediaryType(e.target.value)
    }, [setIntermediaryType])

    const handleNameChanges = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [setName])

    const handleCreate = useCallback(() => {
        const newIntermediary = { ...intermediaryInputValues, name, type: intermediaryType }
        onCreate?.(newIntermediary as IIntermediary)
    }, [intermediaryInputValues, name, intermediaryType, onCreate])

    const handleSave = useCallback(() => {
        const newIntermediary = { id: intermediary.id, ...intermediaryInputValues, name, type: intermediaryType }
        onSave?.(newIntermediary as IIntermediary)
    }, [intermediaryInputValues, intermediaryType, name, onSave, intermediary.id])

    useEffect(() => {
        setIntermediaryInputValues({ from, order, to, step })
        setName(intermediary.name)
    }, [from, intermediary.name, order, step, to])

    return (<div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <h1 className="text-center mb-6 text-blue">{mode} an intermediary</h1>
        <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input className="appearance-none block w-full h-10 bg-gray-200 text-gray-700 border rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" name="name" placeholder="Name" maxLength={255} value={name} onChange={handleNameChanges} />

                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="order">
                        Order
                    </label>
                    <input className="appearance-none block w-full h-10 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="order" type="number" name="order" step="1" placeholder="Order" value={intermediaryInputValues.order} onChange={handleIntermediaryInputValuesChanges} required />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="type">
                        Type
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full h-10 bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="type" name="type" value={intermediaryInputValues.type}
                            onChange={handleIntermediaryTypeChanges} disabled={mode === 'edit'}>
                            {intermediaryTypes.map((intermediaryType, index) => <option value={intermediaryType} key={`intermediaryType-${index}`}>{intermediaryType}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
            {intermediaryType === 'Range' && <div className="flex -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="from">
                        From
                    </label>
                    <input className={`appearance-none block w-full h-10 bg-gray-200 text-gray-700 border rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  ${validationErrors.get('from')?.length ? 'border-red-500' : 'border-gray- 200'}`} id="from" type="number" step="0.000001" placeholder="From" value={intermediaryInputValues.from} onChange={handleFromChanges} />
                    {validationErrors.get('from')?.map((error, index) =>
                        (<p className="text-red-500 text-xs italic" key={`${error}-${index}`}>{error}</p>))}
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="to">
                        To
                    </label>
                    <input className="appearance-none block w-full h-10 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="to" type="number" step="0.000001" placeholder="To" value={intermediaryInputValues.to} onChange={handleIntermediaryInputValuesChanges} />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="step">
                        Step
                    </label>
                    <input className={`appearance-none block w-full h-10 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${validationErrors.get('step')?.length ? 'border-red-500' : 'border-gray- 200'}`} id="step" type="number" step="0.000001" placeholder="Step"
                        value={intermediaryInputValues.step} onChange={handleStepChanges} />
                    {validationErrors.get('step')?.map((error, index) =>
                        (<p className="text-red-500 text-xs italic" key={`${error}-${index}`}>{error}</p>))}
                </div>
            </div>}
            {/* TODO: disable save and create buttons when form is invalid or have validation errors */}
            <div className="flex justify-end items-center gap-2 mt-5">
                <div>
                    <CustomButton text="Cancel" type="button" color="blue" handleClick={onCancel} />
                </div>
                {mode === 'edit' ? <div>
                    <CustomButton text="Save" type="button" color="blue" handleClick={handleSave} />
                </div> :
                    <div>
                        <CustomButton text="Create" type="button" color="blue" handleClick={handleCreate} />
                    </div>}
            </div>
        </form>
    </div>)
}

export default AddEditIntermediaryForm