import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./reducers"

const store = configureStore({
	reducer: rootReducer,
})

export default function ReduxProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return <Provider store={store}>{children}</Provider>
}
