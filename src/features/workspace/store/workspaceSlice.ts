import { createSlice } from '@reduxjs/toolkit'

interface WorkspaceState {
  greetingName: string
}

const initialState: WorkspaceState = {
  greetingName: 'Sanchit',
}

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {},
})

export default workspaceSlice.reducer
