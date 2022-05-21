import Title from './Title.jsx'
import Options from './Options.jsx'

function Header() {

    return (
        <div className='header'>
            <h1><Title /></h1>
            
            <Options/>
        </div>
    )
}

export default Header