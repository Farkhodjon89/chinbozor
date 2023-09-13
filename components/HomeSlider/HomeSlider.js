import Slick from 'react-slick'
import Link from 'next/link'
import { icons } from '../../public/static/fixture'

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className='left-6 absolute text-d-gray-400 stroke-current w-44 h-44 bg-opacity-20 bg-white-100 lg:left-container-space top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center rounded-full focus:outline-none outline-none'
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: icons.arrowLeft }}
    />
  )
}

const NextArrow = ({ onClick }) => {
  return (
    <button
      className='right-6 absolute text-d-gray-400 stroke-current w-44 h-44 bg-opacity-20 bg-white-100 lg:right-container-space top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center rounded-full focus:outline-none outline-none'
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: icons.arrowRight }}
    />
  )
}

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: 'mx-auto mb-72',
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  cssEase: 'linear',
}

const HomeSlider = ({ slides }) => {
  return (
    <Slick {...settings}>
      {slides.map(
        (
          { title, subtitle, subtitle2, url, button, image, mobileImage },
          key
        ) => (
          <div key={key}>
            <div className='relative h-560 md:h-460'>
              <div
                className='hidden md:block bg-no-repeat bg-cover bg-center absolute inset-0'
                style={{ backgroundImage: `url(${image?.sourceUrl})` }}
              />
              <div
                className='md:hidden bg-no-repeat bg-cover bg-center absolute inset-0'
                style={{ backgroundImage: `url(${mobileImage?.sourceUrl})` }}
              />
              <div className='container relative h-full'>
                <div className='absolute md:mb-0  md:pb-0 md:ml-20 md:ml-0 text-center md:text-left justify-center mt-100 md:mt-0 md:top-1/2 left-0 right-0 md:left-95 transform md:-translate-y-1/2 text-d-gray-400'>
                  {title && (
                    <div className='text-18 leading-21 md:text-32 md:leading-30 mb-6'>
                      {title}
                    </div>
                  )}
                  {subtitle && (
                    <div
                      className={`text-20 leading-28 md:text-20 md:leading-37 font-bold  ${
                        subtitle2 ? 'mb-12 md:mb-14' : 'mb-32'
                      }`}
                    >
                      {subtitle}
                    </div>
                  )}
                  {/*{subtitle2 && <div className='text-16 leading-18 md:text-20 md:leading-23 mb-32' dangerouslySetInnerHTML={{ __html: subtitle2 }} />}*/}
                  <Link href={url} legacyBehavior>
                    <a className='text-17 leading-19 mt-40 md:mt-0 font-medium px-20 py-14 bg-d-gray-400 text-white-100 rounded inline-block hover:bg-d-gray-300'>
                      {button}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </Slick>
  )
}

export default HomeSlider
