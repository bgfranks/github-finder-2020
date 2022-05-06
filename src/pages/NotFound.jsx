import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Jedi from '../assets/jedi.png'

export default function NotFound() {
  return (
    <div className='hero'>
      <div className='text-center hero-con'>
        <div className='max-w-lg'>
          <h1 className='text-8xl font-bold mb-8'>404!</h1>
          <div className='flex flex-col'>
            <p className='text-4xl mb-5'>
              This is not the page you are looking for!
            </p>
            <img src={Jedi} alt='Jedi' className='mb-8' />
            <Link className='btn btn-primary btn-lg' to='/'>
              <FaHome className='mr-2' />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
