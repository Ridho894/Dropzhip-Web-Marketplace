import React from "react";

const footerContent = [
  {
    id: 1,
    title: "Get to Know Us",
    children: [
      { id: 1, title: "Careers" },
      { id: 2, title: "Blog" },
      { id: 3, title: "About DropZhip Indonesia" },
      { id: 4, title: "Investor Relations" },
      { id: 5, title: "DropZhip Devices" },
      { id: 6, title: "DropZhip Science" },
    ],
  },
  {
    id: 2,
    title: "Make Money with Us",
    children: [
      { id: 1, title: "Sell products on DropZhip" },
      { id: 2, title: "Sell on DropZhip Business" },
      { id: 3, title: "Sell apps on DropZhip" },
      { id: 4, title: "Become an Affiliate" },
      { id: 5, title: "Advertise Your Products" },
      { id: 6, title: "Self-Publish with Us" },
      { id: 7, title: "Host an DropZhip Hub" },
    ],
  },
  {
    id: 3,
    title: "DropZhip Payment Products",
    children: [
      { id: 1, title: "DropZhip Business Card" },
      { id: 2, title: "Shop with Points" },
      { id: 3, title: "Reload Your Balance" },
      { id: 4, title: "DropZhip Currency Converter" },
    ],
  },
  {
    id: 4,
    title: "Let Us Help You",
    children: [
      { id: 1, title: "DropZhip and COVID-19" },
      { id: 2, title: "Your Account" },
      { id: 3, title: "Your Orders" },
      { id: 4, title: "Shipping Rates & Policies" },
      { id: 5, title: "Returns & Replacements" },
      { id: 6, title: "Manage Your Content and Devices" },
      { id: 7, title: "DropZhip Assistant" },
      { id: 8, title: "Help" },
    ],
  },
];

function Footer() {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer>
      <section
        onClick={goTop}
        className="bg-dropzhip_blue-light p-4 text-center text-sm cursor-pointer hover:opacity-95 text-white"
      >
        <h1>Back To Top</h1>
      </section>
      <section className="bg-dropzhip_blue text-white p-10 grid grid-flow-row-dense grid-cols-2 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-start xl:justify-items-center">
        {footerContent.map((item) => (
          <div key={item.id}>
            <h1 className="font-semibold">{item.title}</h1>
            {item.children.map((child) => (
              <p
                className="font-thin text-sm my-2 hover:underline cursor-pointer"
                key={child.id}
              >
                {child.title}
              </p>
            ))}
          </div>
        ))}
      </section>
    </footer>
  );
}

export default Footer;
