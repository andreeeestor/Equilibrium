import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"

interface ProvidersProps {
    children: ReactNode
}
export default function Providers(props : ProvidersProps){
    return(
        <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
            {props.children}
        </ThemeProvider>
    )
}