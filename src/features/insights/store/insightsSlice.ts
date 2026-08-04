import { createSlice } from '@reduxjs/toolkit'

interface InsightsState {
  weeklyActivity: { day: string; value: number }[]
  streakDays: number
}

const initialState: InsightsState = {
  weeklyActivity: [
    { day: 'MON', value: 30 },
    { day: 'TUE', value: 55 },
    { day: 'WED', value: 80 },
    { day: 'THU', value: 40 },
    { day: 'FRI', value: 95 },
    { day: 'SAT', value: 20 },
    { day: 'SUN', value: 10 },
  ],
  streakDays: 4,
}

const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {},
})

export default insightsSlice.reducer
