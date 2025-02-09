import { storageService } from './async-storage.service.js'
import { makeId, loadFromStorage, saveToStorage } from './util.service.js'

const KEY = 'contacts'
_createContacts()

export const contactService = {
    query,
    get,
    remove,
    save,
    getEmptyContact,
}

async function query(filterBy = {}) {
    var contacts = await storageService.query(KEY)

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        contacts = contacts.filter(contact => regex.test(contact.name))
    }
    return contacts
}

async function get(id) {
    return storageService.get(KEY, id)
}

async function remove(id) {
    return storageService.remove(KEY, id)
}

async function save(contact) {
    if (contact._id) return storageService.put(KEY, contact)
    else return storageService.post(KEY, contact)
}

function getEmptyContact() {
    return {
        name: '',
        email: '',
        phone: ''
    }
}

function _createContacts() {
    var contacts = loadFromStorage(KEY)
    if (contacts && contacts.length) return

     contacts = [
        {
            "_id": "4b32ca",
            "name": "Ochoa Hyde",
            "email": "ochoahyde@renovize.com",
            "phone": "+1 (968) 593-3824"
        },
        {
            "_id": "a99fde",
            "name": "Hallie Mclean",
            "email": "halliemclean@renovize.com",
            "phone": "+1 (948) 464-2888"
        },
        {
            "_id": "83d319",
            "name": "Parsons Norris",
            "email": "parsonsnorris@renovize.com",
            "phone": "+1 (958) 502-3495"
        },
        {
            "_id": "b47b4d",
            "name": "Rachel Lowe",
            "email": "rachellowe@renovize.com",
            "phone": "+1 (911) 475-2312"
        },
        {
            "_id": "e4699d",
            "name": "Dominique Soto",
            "email": "dominiquesoto@renovize.com",
            "phone": "+1 (807) 551-3258"
        },
        {
            "_id": "a9220a",
            "name": "Shana Pope",
            "email": "shanapope@renovize.com",
            "phone": "+1 (970) 527-3082"
        },
        {
            "_id": "f990db",
            "name": "Faulkner Flores",
            "email": "faulknerflores@renovize.com",
            "phone": "+1 (952) 501-2678"
        },
        {
            "_id": "0ffbdf",
            "name": "Holder Bean",
            "email": "holderbean@renovize.com",
            "phone": "+1 (989) 503-2663"
        },
    ];
//     return contacts
// }

    saveToStorage(KEY, contacts)
}


