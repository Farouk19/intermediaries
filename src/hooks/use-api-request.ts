import { AxiosRequestConfig } from 'axios'
import { useCallback } from 'react'
import { axiosClient } from '../utils'

export function useApiRequest() {
    const request = useCallback(
        <T = any>(config: AxiosRequestConfig): Promise<T | undefined> => {
            return axiosClient
                .request<T>(config)
                .then((response) => response.data)
                .catch((error): undefined => {
                    console.error({ error })
                    throw error
                })
        },
        []
    )

    return request
}
