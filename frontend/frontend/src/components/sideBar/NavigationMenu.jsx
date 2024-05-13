import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LunchDiningIcon from '@mui/icons-material/LunchDining';

export const navigationMenu = [
    {
        icon: <HomeIcon/>,
        title: "Home",
        path: "/"
    },
    { 
        icon: <NotificationsIcon/>,
        title: "Notification",
        path: "/notificaton"
    },
    {
        icon: <AccountCircleIcon/>,
        title: "Profile",
        path: "/profile"
    },
    {
        icon: <DirectionsRunIcon/>,
        title: "Workout Updates",
        path: "/workout-updates"
    },
    {
        icon: <FitnessCenterIcon/>,
        title: "Workout Plan",
        path: "/workout-plans"
    },
    {
        icon: <LunchDiningIcon/>,
        title: "Meal Plan",
        path: "/meal-plan"
    }
];