import { contactService } from "@/services/contact.service"

export default {
    state() {
        return {
            contacts: null,
        }
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(contact => contact._id === contactId)
            state.contacts.splice(idx, 1)
        }
    },
    getters: {
        contacts(state) {
            return state.contacts
        }
    },
    actions: {
        async loadContacts(context, {filterBy={}}) {
            const contacts = await contactService.query(filterBy)
            context.commit({ type: 'setContacts', contacts })
        },
        async removeContact({ commit }, { contactId }) {
            try {
                await contactService.remove(contactId)
                commit({ type: 'removeContact', contactId })
            } catch (err) {
                console.log(err);
                throw err
            }
        }
    },
}