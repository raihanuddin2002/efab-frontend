import { paths } from "@/confiig/paths.cofig";
import { faDotCircle } from "@fortawesome/free-regular-svg-icons";
import { faBox, faHome, faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

export const sidebarMenuItems = [
    {
        title: 'Dashboard',
        icon: faHome, // Assuming you have imported faHome from FontAwesome
        link: paths.dashboard.root,
        hasDropdown: false
    },
    {
        title: 'Products',
        icon: faBox,
        link: paths.dashboard.products.root,
        hasdropdown: true,
        childrens: [
            {
                title: 'All Products',
                icon: faDotCircle,
                link: paths.dashboard.products.root,
            },
            {
                title: 'Create',
                icon: faPlusCircle,
                link: paths.dashboard.products.create,
            },
            {
                title: 'Search',
                icon: faSearch,
                link: paths.dashboard.products.search,
            },
        ]
    },
]