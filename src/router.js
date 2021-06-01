const homePage = () => import(BASE_URL+"/src/page/homePage.js");

const routes = [
    { path: '/', component: homePage, alias: '/home' },
    {
        path: '/test', redirect: to => {
        return '/path'
    }}
]
export default routes;