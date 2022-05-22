import { FaAngleUp } from 'react-icons/fa'

function BackToTop() {
    const scrollToTop = () => {
        window.scroll(0,0)
    }

    window.addEventListener('scroll', (e) => {
        const backToTop = document.getElementById('back-to-top')
        if (window.pageYOffset > 50) {
            backToTop.style.opacity = '1'
        } else {
            backToTop.style.opacity = '0'
        }
    })
    const style = {
        cursor: 'pointer',
        position: 'fixed',
        bottom: '10%',
        right: '50px',
        fontSize: '40px',
        border: '1px #000 solid',
        borderRadius: '50%',
        opacity: '0',
        boxShadow: '-2px 2px 3px',
    }
  return (
    <FaAngleUp id='back-to-top' style={style} onClick={scrollToTop}/>
  )
}

export default BackToTop