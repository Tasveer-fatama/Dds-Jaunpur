import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animateBg, setAnimateBg] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { title: "Home", link: "/" },
    { title: "About ", link: "/about1" },
    { title: "Services", dropdown: true }, // Services dropdown
    { title: "Events", dropdown: true }, // Events dropdown
    { title: "Course", dropdown: true }, // ✅ New Course dropdown
    { title: "Donation", link: "/donation" },
  ];

  // Services dropdown data
  const servicesDropdown = [
    {
      title: "Marketing",
      items: [
        { name: "Digital Marketing", link: "/digital" },
        { name: "Social Media Marketing", link: "/social" },
       { name: "SEO", link: "/Seo" },
        { name: "Content Writing", link: "/Content" },
      ],
    },
    {
      title: "Development",
      items: [
        { name: "Web Development", link: "/Web" },
    
      ],
    },
    {
      title: "Design",
      items: [
        { name: "Graphic Design", link: "/Graphic" },
        { name: "Video Editing", link: "/videoediting" },
      ],
    },
  ];

  // Events dropdown data
  const eventsDropdown = [
    {
      title: "Gallery",
      items: [
        { name: "Photos", link: "/Photos" },
        { name: "Videos", link: "/Videos" },
      ],
    },
  ];

  // ✅ Course dropdown data
  const courseDropdown = [
    {
      title: "Courses",
      items: [
        { name: "Offline Course", link: "/OfflineCourses" },
        { name: "Online Course", link: "/OnilneCourses" },
      ]
    },
  ];

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
    setAnimateBg(true);
    setTimeout(() => setAnimateBg(false), 600);
  };

  // Helper: pick dropdown data based on item.title
  const getDropdownData = (title) => {
    if (title === "Services") return servicesDropdown;
    if (title === "Events") return eventsDropdown;
    if (title === "Course") return courseDropdown;
    return [];
  };

  return (
    <nav className="fixed w-full z-50 bg-white py-3 shadow-md transition-all duration-500">
      {/* Animated Red Background */}
      <div
        className={`absolute top-0 right-0 h-full bg-red-600 transition-all duration-600 ease-in-out ${
          animateBg ? "w-full" : "w-0"
        }`}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 z-20">
            <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center overflow-hidden border-2 border-red-600 transition-transform duration-300 hover:scale-105">
              <img
                src="/Ddslogo.png"
                alt="DDS Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="text-black text-xl md:text-2xl font-bold hidden sm:block font-poppins">
              <span className="text-red-600">DDS</span>  Group Of
              Institution
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {!item.dropdown ? (
                  <a
                    href={item.link}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group font-montserrat
                      text-black hover:bg-gray-100`}
                  >
                    {item.title}
                  </a>
                ) : (
                  <>
                    {/* Dropdown button */}
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                      className="px-4 py-2 rounded-md font-medium transition-all duration-300 hover:scale-105 text-black hover:bg-gray-100"
                    >
                      {item.title} ▾
                    </button>

                    {/* Dropdown menu */}
                    {openDropdown === index && (
                      <div className="absolute left-0 mt-2 w-[90vw] sm:w-[600px] bg-white shadow-lg rounded-lg p-6 grid grid-cols-2 sm:grid-cols-3 gap-6 z-50">
                        {getDropdownData(item.title).map((col, i) => (
                          <div key={i}>
                            <h4 className="font-bold text-red-600 mb-3">
                              {col.title}
                            </h4>
                            <ul className="space-y-2">
                              {col.items.map((subItem, j) => (
                                <li key={j}>
                                  <a
                                    href={subItem.link}
                                    className="text-gray-700 hover:text-red-600 transition-colors"
                                  >
                                    {subItem.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Get in Touch Button */}
            <a
              href="/GetInTouch"
              className="ml-4 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 transition-all duration-300"
            >
            Download Certificate 
            
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={handleMenuToggle}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-600 group transition-all duration-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span
                className={`absolute h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                } group-hover:bg-white`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                } group-hover:bg-white`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                } group-hover:bg-white`}
              ></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
