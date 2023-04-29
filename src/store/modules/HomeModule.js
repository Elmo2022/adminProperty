import link from "../../api/Link.js"
import apiUrl from "../../api/url.js"

let HomeModule = {
    state: {
        navBool: true,
        dialogFormVisible: false,
        uplistData: {},

        listdata: []
    },
    mutations: {
        SET_NAV_BOOL(state) {
            state.navBool = !state.navBool;
        },
        SET_DIALOG(state, paylog) {
            state.dialogFormVisible = !state.dialogFormVisible;


            state.uplistData = paylog

        },
        DIALOG(state) {
            state.dialogFormVisible = !state.dialogFormVisible;
            window.location.reload()

        },
        LISTDATA(state, paylog) {
            state.listdata = paylog
        },
       
    },
    actions: {
        USERUPDATE_LIST(context) {
            link(apiUrl.userlist).then((ok) => {
                console.log(ok);

                context.commit("LISTDATA", ok.data)



            });
        },
        DEL_DATA(context,payload){
            link(apiUrl.userlist+"/"+payload.id,"delete").then((ok) => {
                    console.log(ok)
                    window.location.reload()



            });
        }
    },
    getters: {

    }
}

export default HomeModule