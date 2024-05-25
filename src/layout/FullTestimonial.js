import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../public/user.png";
const testimonials = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=576&h=576&q=80", // Dummy image URL
    name: "John Doe",
    testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=576&h=576&q=80", // Dummy image URL
    name: "Jane Smith",
    testimonial:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=576&h=576&q=80", // Dummy image URL
    name: "Alice Johnson",
    testimonial:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  },
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="max-w-lg mx-auto">
      <h6
        className="text-center"
        style={{ color: "#ff0018", fontSize: "20px" }}
      >
        TESTIMONIALS
      </h6>
      <h3 className=" font-bold text-center" style={{ fontSize: "30px" }}>
        People Say About Us!
      </h3>
      <Slider {...settings} className="mx-auto">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="px-4">
            <div className=" p-4 rounded-lg shadow-md">
              <img src={testimonial.img} alt="feedback" id="testimonial-img" />
              <p>{testimonial.testimonial}</p>
              <p className="text-lg font-semibold">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
