import {useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import { Container } from 'reactstrap'
import Navbar from './CustomNavbar'
import Footer from './Footer'

const Template = ({ children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('login')) {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <Navbar />
            <main style={{ backgroundColor: 'grey' }} >
                <Container className='pt-4 pb-4' >
                    {children}
                </Container>
            </main>
            <Footer />
        </div>
    )
}

export default Template