import { motion } from 'framer-motion'

const ContactCards = ({ contactList, setSelectedContact }) => {
  return (
    <>
      {contactList?.map((contact, index) => (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          transition={{ duration: index/5 }}
          drag={false}
          dragElastic={1}
          dragConstraints={{ top: 1, bottom: 1, right: 1, left: 1 }}
          className="bg-white text-white h-80 rounded-lg shadow-md hover:bg-gray-200"
          key={index}
          onClick={() => setSelectedContact(contact)}
        >
          <a
            href="#"
            className="text-blue-900 hover:text-blue-400 block px-2 py-1 rounded-md text-xl font-medium text-right"
          >
            ...
          </a>
          <div className="rounded-full h-32 w-32 bg-red-50 mx-auto mb-4 text-center align-text-middle">
          <p className="text-red-50 font-semibold text-xl">
                {contact.name.charAt(0).toUpperCase()}
            </p>
            <p className="text-blue-900 font-semibold text-7xl">
                {contact.name.charAt(0).toUpperCase()}
            </p>
          </div>
          <figcaption className="text-center mt-5">
            <p className="text-blue-900 font-semibold text-xl mb-2">
              {contact.name}
            </p>
            <p className="text-blue-800">
              <span className="font-medium">email: </span>{contact.email}
            </p>
            <p className="text-blue-800">
              <span className="font-medium">phone: </span>{contact.phone}
            </p>
            <p className="text-blue-800">
              <span className="font-medium">city: </span>{contact.address.city}
            </p>
          </figcaption>
        </motion.button>
      ))}
    </>
  )
}

export default ContactCards