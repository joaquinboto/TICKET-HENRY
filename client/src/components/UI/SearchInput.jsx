import { Fragment, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SearchInput() {
    const events = useSelector((state) => state.events)





  const [query, setQuery] = useState('')

  const [open, setOpen] = useState(true)


  function mappingArtist(arr, sea) {
    for(let i = 0; i < arr.length; i++){
        if( arr[i].toLowerCase().includes(sea)) return arr[i]
    }
  }

  const filteredPeople =
    query === ''
      ? []
      : events.filter((el) => {
          return mappingArtist(el.artist, query.toLowerCase())
        })

    function returnNames(arr){
        for(let i = 0; i < arr.length; i++){
            return arr[i]
        }
    }

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox >
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Buscar artista..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {filteredPeople.length > 0 && (
                  <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                    {filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        value={person}
                        className={({ active }) =>
                          classNames('cursor-default select-none px-4 py-2', active && 'bg-indigo-600 text-white')
                        }
                      >
                       <Link to={`/private/events/${person.id}`}>{person.artist.join(" - ")}</Link> 
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== '' && filteredPeople.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">No se encontro ningun evento con ese artista...</p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
