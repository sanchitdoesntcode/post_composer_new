import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store/rootReducer'
import type { AppDispatch } from '@/store/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
