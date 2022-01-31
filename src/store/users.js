export default {
    namespaced: true,
    state: {
      users: [],
    },
    mutations: {
      insert: (state, payload)=>{
        //add users to list users
        state.users.push({
            id: payload.id,
            name: payload.name,
            city_name: payload.city_name,
            token: payload.token,
        })
      },
      update:(state, payload) => {
        //search payload by index
        let index = state.users.indexOf(payload);
        //user change many users
        state.users.splice(index,1,{
            id: payload.id,
            name: payload.name,
            city_name: payload.city_name,
            token: payload.token,
        });
        if (payload.quantity<=0) {
          state.users.splice(index, 1)
        }
      },
      delete:(state, id) => {
        let index = state.users.findIndex(item => item.id == id)
        state.users.splice(index, 1)
      },
      set: (state, payload) => {
          state.users = payload
      },
    },
    actions: {
      //delete users
      remove: ({state, commit}, payload) => {
          let usersItem = state.users.find(item => item.id === payload.id)
          if(usersItem){
              commit('delete', usersItem.id)
          }
      },
      //list after update
      set: ({commit}, payload) => {
          commit('set', payload)
      },
    },
    modules: {
    },
    getters: {
      users : state => state.users,
      count : (state) => {
          return state.users.length
      },
    }
  }