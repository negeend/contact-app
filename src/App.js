import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import useFetch from 'react-fetch-hook'
import ContactCards from './ContactCards'
import ContactModal from './ContactModal'
import { Transition } from "@headlessui/react";

const App = () => {
  const url = 'https://jsonplaceholder.typicode.com'
  const { isLoading, data, error } = useFetch(url+'/users')
  const [selectedContact, setSelectedContact] = useState(null)
  const [contactList, setContactList] = useState()
  const [filterQuery, setFilterQuery] = useState()
  const [isOpen, setIsOpen] = useState(false)

  data?.sort(function(a, b){
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
  })

  useEffect(() => {
    if (!filterQuery) {
      setContactList(data?.slice(0, 10))
    } else {
      const queryString = filterQuery.toLowerCase()
      const filteredData = data.filter(contact => {

        // if it's just one letter, return all names that start with it
        if (queryString.length === 1) {
          const firstLetter = contact.name.charAt(0).toLowerCase()
          return firstLetter === queryString
        }
        else {
          return contact.name.toLowerCase().includes(queryString)
        }
      })
      setContactList(filteredData)
    }
  }, [data, filterQuery])

  return (
    <div className="bg-gray-100">
      <section>
        <div>
          <nav className="bg-blue-800 hover:bg-blue-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-9 w-20"
                      src="https://images.squarespace-cdn.com/content/v1/58211cf1440243808e7915ff/1517965674370-88D981PZOGWAF67RIOBO/resonatelogo_flat.png"
                      onclick="window.open('www.resonatesolutions.com.au')"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <a
                        href="#"
                        className=" hover:bg-blue-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Contacts
                      </a>

                      <a
                        href="#"
                        className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        About us
                      </a>

                      <a
                        href="#"
                        className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Contact us
                      </a>

                      <a
                        href="#"
                        className="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Services
                      </a>


                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="bg-blue-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {!isOpen ? (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Transition
              show={isOpen}
              enter="transition ease-out duration-100 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {(ref) => (
                <div className="md:hidden" id="mobile-menu">
                  <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a
                      href="#"
                      className="hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Contacts
                    </a>

                    <a
                      href="#"
                      className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      About us
                    </a>

                    <a
                      href="#"
                      className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Contact us
                    </a>

                    <a
                      href="#"
                      className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Services
                    </a>

                  </div>
                </div>
              )}
            </Transition>
          </nav>

          <header className="bg-red-50 shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-blue-900">Contacts</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            </div>
          </main>
        </div>
        <form>
          <input
            type={"text"}
            placeholder={"type here to filter..."}
            onChange={event => setFilterQuery(event.target.value)}
            className={"ml-20 mt-6 rounded-md p-2 hover:bg-gray-200"}
          />
        </form>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-10 md:p-20 lg:p-20">
        {isLoading
          ? <h1>Fetching data...</h1>
          : <ContactCards contactList={contactList} setSelectedContact={setSelectedContact} />
        }
        {error && <h1>Error fetching data...</h1>}
        {contactList?.length < 1 && <h1>No data matches your search</h1>}
      </section>
      <AnimatePresence>
        {selectedContact &&
          <ContactModal
            contact={selectedContact}
            setSelectedContact={setSelectedContact}
          />
        }
      </AnimatePresence>
    </div>
  )
}



export default App