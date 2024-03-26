import Footer from '~/components/Footer'
import LoginHeader from '~/components/LoginHeader'

interface RegisterLayoutProps {
    children?: React.ReactNode
}
export default function LoginLayout({ children }: RegisterLayoutProps) {
    return (
        <div>
            <LoginHeader />
            {children}
            <Footer />
        </div>
    )
}
