import {reqAddressInfo,reqThingInfo} from '@/api'
const state={
    addressinfo:[],
    thinginfo:{}
}
const mutations={
    GETADDRESSINFO(state,addressinfo){
        state.addressinfo= addressinfo
    },
    GETTHINGINFO(state,thinginfo){
      state.thinginfo=thinginfo
    }
}
const actions={
    async getAddressInfo({commit}){
       let result = await reqAddressInfo();
       if(result.code==200){
        commit("GETADDRESSINFO",result.data)
    }
    },
    async getThingInfo({commit}){
        let result =  await reqThingInfo();
        if(result.code==200){
            commit("GETTHINGINFO",result.data)
        }
    }
}
const getters={}



export default {
    state,
    mutations,
    actions,
    getters,

}