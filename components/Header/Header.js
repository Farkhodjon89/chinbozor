import Link from 'next/link'
import TopBar from '../TopBar/TopBar'
import { icons } from '../../public/static/fixture'
import { useState } from 'react'
import Sticky from 'react-sticky-el'
import CartModal from '../CartModal/CartModal'
import OutsideClicker from '../OutsideClicker/OutsideClicker'
import { hideCartModal, showCartModal } from '../../redux/actions/modalActions'
import { connect } from 'react-redux'
import Search from '../Search/Search'

const actionIcons = [
  // {
  //  icon: icons.wishlist,
  //  url: '/wishlist'
  // },
  {
    icon: icons.compare,
    url: '#'
  },
  {
    icon: icons.search,
    url: '#',
    isSearch: true
  },
  {
    icon: icons.cart,
    url: '/cart',
    full: true
  }
]

const Header = ({
  categories,
  showCartModal,
  hideCartModal,
  modalState
}) => {
  const [activeSubMenu, setActiveSubMenu] = useState()
  const [activeMobileSubMenu, setActiveMobileSubMenu] = useState()
  const [showCategories, setShowCategories] = useState(false)
  const outSideClickerCallBack = () => setShowCategories(false)

  return (

    <header className="flex-shrink z-30">
      <TopBar/>
      <Sticky stickyStyle={{ backgroundColor: 'white' }}>
        <div className="relative">
          <div className="container py-14 flex items-center md:relative">
            <div className="order-2 flex-grow flex justify-center md:flex-grow-0 md:order-1 md:mr-36">
              <Link href="/" legacyBehavior>
                <a className={`${showCategories ? 'hidden' : ''} md:block`}
                   dangerouslySetInnerHTML={{ __html: icons.logo }}/>
              </Link>
            </div>
            <div className="order-1 md:order-2 md:mr-36 w-110 md:w-auto">
              <OutsideClicker callback={outSideClickerCallBack}>
                <button
                  onClick={() => {
                    setShowCategories(!showCategories)
                    setActiveSubMenu(categories[0]?.id)
                    setActiveMobileSubMenu('')
                  }}
                  className={`text-white-100 text-15 leading-17 flex items-center pl-12 md:pr-12 py-12 rounded hover:bg-f-red-400 stroke-current ${showCategories ? 'pr-12 bg-f-red-400' : 'pr-20 bg-f-red-500'}`}
                >
                  <i
                    dangerouslySetInnerHTML={{ __html: showCategories ? icons.close : icons.burger }}
                  />
                  <span className="hidden md:block ml-12">Каталог товаров</span>

                  <span
                    className={`md:hidden md:ml-0 ml-12 ${showCategories ? 'hidden' : ''}`}>Меню</span>
                </button>
                <div
                  className={`absolute top-full md:top-0 md:mt-75 top-0 left-0 w-screen md:w-auto h-screen md:h-auto md:w-auto md:h-auto right-0 z-10 bg-white-100  ${!showCategories ? 'hidden' : ''}`}>
                  <div className="container">
                    <div className="md:block hidden">
                      <div className="md:grid gap-8 grid-cols-4">
                        <div className="bg-white md:bg-white-200">
                          <ul className="py-10 md:py-14">
                            {categories.map(({ id, name, slug, children }) => (
                              <li key={`${id}-parent`}>
                                <Link legacyBehavior href={`/shop/${slug}`}>
                                  <a
                                    onMouseEnter={() => setActiveSubMenu(id)}
                                    className={`hidden md:block rounded text-16 leading-20 px-20 py-14 hover:bg-white-100 hover:text-f-red-400 ${id === activeSubMenu ? 'bg-white-100 text-f-red-500' : 'text-d-gray-300'}`}
                                  >
                                    {name}
                                  </a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-start-2 col-end-5">
                          {categories.map(({ id, name, children }) => (
                            <ul key={`${id}-child`}
                                className={`pl-15 md:py-14 py-30 grid grid-cols-1 md:grid-cols-3 gap-30 gap-y-0 ${activeSubMenu !== id ? 'hidden' : ''}`}>
                              {children.map(
                                ({
                                  id: childID,
                                  name: childName,
                                  children: childChildren,
                                  slug: childSlug
                                }) => (
                                  <li key={childID}
                                      className="text-15 leading-17 mb-20">
                                    <div className="mb-20 md:my-20">
                                      <Link legacyBehavior href={`/shop/${childSlug}`}>
                                        <a className="font-medium text-d-gray-400 hover:text-f-red-400">
                                          {childName}
                                        </a>
                                      </Link>
                                    </div>
                                    <ul className="text-d-gray-400">
                                      {childChildren.map(
                                        ({
                                          id: childID2,
                                          name: childName2,
                                          slug: childSlug2
                                        }) => (
                                          <li key={childID2}
                                              className="mb-16">
                                            <Link
                                              legacyBehavior
                                              href={`/shop/${childSlug2}`}>
                                              <a className="hover:text-f-red-400">
                                                {childName2}
                                              </a>
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </li>
                                )
                              )}
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="md:hidden">
                      {!activeMobileSubMenu &&
                        <ul className="py-10 md:py-14">
                          {categories.map(({ id, name, slug, children }) => (
                            <li key={`${id}-parent`} className="mb-14">
                              <button
                                onClick={() => setActiveMobileSubMenu(id)}
                                className="relative w-full text-left bg-white-200 rounded rounded text-16 leading-20 px-20 py-14 hover:bg-white-100 hover:text-f-red-400 text-d-gray-300"
                              >
                                {name}
                                <span
                                  className="stroke-current absolute right-18 top-1/2 -translate-y-1/2 transform text-d-gray-200"
                                  dangerouslySetInnerHTML={{ __html: icons.arrowRight }}/>
                              </button>
                            </li>
                          ))}
                        </ul>}
                      <div>
                        {categories.map(({ id, name, children }, key) => {
                          if (activeMobileSubMenu === id) {
                            return (
                              <div key={key} className="pt-10">
                                <button
                                  onClick={() => setActiveMobileSubMenu('')}
                                  className="relative mb-24 text-16 leading-18 bg-f-red-400 bg-opacity-5 py-14 px-20 border border-f-red-400 text-f-red-500 rounded w-full text-left font-medium"
                                >
                                  {name}
                                  <span
                                    className="stroke-current absolute right-18 top-1/2 -translate-y-1/2 transform text-d-gray-200"
                                    dangerouslySetInnerHTML={{ __html: icons.arrowLeft }}/>
                                </button>
                                <ul key={`${id}-child`}>
                                  {children.map(
                                    ({
                                      id: childID,
                                      name: childName,
                                      children: childChildren,
                                      slug: childSlug
                                    }) => (
                                      <li key={childID}
                                          className="text-15 leading-17 mb-24">
                                        <div className="mb-20 md:my-20">
                                          <Link legacyBehavior href={`/shop/${childSlug}`}>
                                            <a className="font-medium text-d-gray-400 hover:text-f-green-500">
                                              {childName}
                                            </a>
                                          </Link>
                                        </div>
                                        <ul className="text-d-gray-400">
                                          {childChildren.map(
                                            ({
                                              id: childID2,
                                              name: childName2,
                                              slug: childSlug2
                                            }) => (
                                              <li key={childID2}
                                                  className="mb-16">
                                                <Link
                                                  legacyBehavior
                                                  href={`/shop/${childSlug2}`}>
                                                  <a className="hover:text-f-red-500">
                                                    {childName2}
                                                  </a>
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )
                          }
                          return null
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </OutsideClicker>
            </div>
            <div className="order-3 hidden md:block">
              <Search/>
            </div>
            <div className="order-4 ml-auto w-110 md:w-auto flex justify-end">
              <ul className="flex items-center">
                {actionIcons.map(({ full, isSearch, url, icon }, key) => (
                  <li
                    key={key}
                    className={`hidden ml-24 ${full ? 'sm:flex items-center' : isSearch ? ' sm:block md:hidden' : 'md:block'}  `}
                  >
                    {url === '/cart'
                      ? <button
                        dangerouslySetInnerHTML={{ __html: icon }}
                        className="stroke-current text-d-gray-400 hover:text-f-red-500"
                        onClick={() => !modalState.cart ? showCartModal() : null}
                      />
                      : isSearch
                        ? <Search/>
                        : (
                          <Link href={url} legacyBehavior>
                            <a
                              dangerouslySetInnerHTML={{ __html: icon }}
                              className="stroke-current text-d-gray-400 hover:text-f-red-500"
                            />
                          </Link>)}
                  </li>
                ))}
              </ul>
            </div>
            <CartModal/>
          </div>
        </div>
      </Sticky>
    </header>

  )
}

const mapStateToProps = (state) => {
  return {
    modalState: state.modalState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showCartModal: () => {
      dispatch(showCartModal())
    },
    hideCartModal: () => {
      dispatch(hideCartModal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
