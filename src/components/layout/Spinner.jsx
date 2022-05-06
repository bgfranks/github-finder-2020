import Loading from '../../assets/loading.gif'

export default function Spinner() {
  return (
    <div className='w-100 mt-20'>
      <img
        width={180}
        className='text-center mx-auto'
        src={Loading}
        alt='loading'
      />
    </div>
  )
}
