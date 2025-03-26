// import {useLocalePath} from "#i18n";
// export default defineNuxtRouteMiddleware((context ) => {
//     const localePath = useLocalePath()
//     const user = useCookie('user')
//     if(!user.value && context.meta.requiredAuth){
//         console.log('User not logged in')
//         return navigateTo(localePath('/auth/login'))
//     }
// })

import {useLocalePath} from "#i18n";
export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated, tokenCookies } = useAuth()

    const localPath = useLocalePath();
    if (!isAuthenticated()){
        return navigateTo(localPath('/auth/login'))
    }
});

