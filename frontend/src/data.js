export const NavLinks = [
    {
        label: "Home",
        href: "/user",
    },
    {
        label: "Jobs",
        href: "/user/jobs",
    },
    {
        label: "Profile",
        href: "/user/profile",
    },
    {
        label: "FAQ",
        href: "/user/faq-questions",
    },
];

export const formatTime = (time) => {
    console.log(time)
    const [hours, minutes] = time.split(":");
    return new Date(0, 0, 0, hours, minutes).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};