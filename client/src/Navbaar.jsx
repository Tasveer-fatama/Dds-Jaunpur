import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animateBg, setAnimateBg] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { title: "Home", link: "/" },
    { title: "About ", link: "/about1" },
    { title: "Services", dropdown: true },
    { title: "Events", dropdown: true },
    { title: "Course", dropdown: true },
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
      items: [{ name: "Web Development", link: "/Web" }],
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

  // Course dropdown data
  const courseDropdown = [
    {
      title: "Courses",
      items: [
        { name: "Offline Course", link: "/OfflineCourses" },
        { name: "Online Course", link: "/OnilneCourses" },
      ],
    },
  ];

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
    setAnimateBg(true);
    setTimeout(() => setAnimateBg(false), 600);
  };

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
                src="/ddslogo.png"
                alt="DDS Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="text-black text-xl md:text-2xl font-bold hidden sm:block font-poppins">
              <span className="text-red-600">DDS</span> Group Of Institution
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {!item.dropdown ? (
                  <a
                    href={item.link}
                    className="px-4 py-2 rounded-md font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group font-montserrat text-black hover:bg-gray-100"
                  >
                    {item.title}
                  </a>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                      className="px-4 py-2 rounded-md font-medium transition-all duration-300 hover:scale-105 text-black hover:bg-gray-100"
                    >
                      {item.title} ▾
                    </button>
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

      {/* ✅ Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40 animate-slide-down">
          <ul className="flex flex-col space-y-2 p-4">
            {navItems.map((item, index) => (
              <li key={index}>
                {!item.dropdown ? (
                  <a
                    href={item.link}
                    className="block px-4 py-2 rounded-md font-medium text-black hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </a>
                ) : (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                      className="w-full text-left px-4 py-2 rounded-md font-medium text-black hover:bg-gray-100 flex justify-between items-center"
                    >
                      {item.title} ▾
                    </button>
                    {openDropdown === index && (
                      <div className="pl-6 py-2 space-y-2">
                        {getDropdownData(item.title).map((col, i) => (
                          <div key={i}>
                            <h4 className="font-bold text-red-600 mb-2">
                              {col.title}
                            </h4>
                            <ul className="space-y-1">
                              {col.items.map((subItem, j) => (
                                <li key={j}>
                                  <a
                                    href={subItem.link}
                                    className="block text-gray-700 hover:text-red-600 transition-colors"
                                    onClick={() => setIsOpen(false)}
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
                  </div>
                )}
              </li>
            ))}
            <li>
              <a
                href="/GetInTouch"
                className="block text-center w-full px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Download Certificate
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
