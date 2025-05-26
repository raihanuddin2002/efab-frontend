import { faDotCircle } from "@fortawesome/free-regular-svg-icons";
import { faBox, faHome, faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

export const sidebarMenuItems = [
    {
        title: 'Dashboard',
        icon: faHome, // Assuming you have imported faHome from FontAwesome
        link: '/dashboard',
        hasDropdown: false
    },
    {
        title: 'Products',
        icon: faBox,
        link: '/dashboard/products',
        hasdropdown: true,
        childrens: [
            {
                title: 'All Products',
                icon: faDotCircle,
                link: '/dashboard/products/all',
            },
            {
                title: 'Create',
                icon: faPlusCircle,
                link: '/dashboard/products/create',
            },
            {
                title: 'Search',
                icon: faSearch,
                link: '/dashboard/products/search',
            },
        ]
    },
]