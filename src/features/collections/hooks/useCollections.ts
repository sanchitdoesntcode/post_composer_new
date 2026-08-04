import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectAllCollections } from '@/features/collections/selectors/collectionsSelectors'
import { collectionCreated } from '@/features/collections/store/collectionsSlice'

export function useCollections() {
  const dispatch = useAppDispatch()
  const all = useAppSelector(selectAllCollections)

  return {
    all,
    createCollection: (name: string, color: string) =>
      dispatch(collectionCreated(name, color)),
  }
}
