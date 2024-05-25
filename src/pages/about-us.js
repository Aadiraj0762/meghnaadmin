import { React, useEffect } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { FaUtensils } from "react-icons/fa";

//internal import
import Layout from "@layout/Layout";
import PageHeader from "@component/header/PageHeader";
import FullTestimonial from "@layout/FullTestimonial";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <Layout title="About Us" description="This is about us page">
      <PageHeader title="about-page-title" />
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          <div className="grid grid-flow-row lg:grid-cols-2 gap-4 lg:gap-16 items-center">
            <div className="">
              <h3 className="text-xl lg:text-3xl mb-2 font-serif font-semibold">
                <h2 className="text-light-black">
                  A History that Became{" "}
                  <span class="text-light-green">Bengaluru's Favorite</span>{" "}
                  since 2006{" "}
                </h2>
              </h3>
              <div className="mt-3 text-base opacity-90 leading-7">
                <p class="text-black" align="justify">
                  Meghana, meaning rain, is a restaurant that was started in the
                  year 2006, at Koramangala, Bengaluru with the intention of
                  serving authentic Andhra style food, using quality ingredients
                  and the pure passion and love for what we do. Since its humble
                  opening a decade back, Meghana is honoured to have spread
                  across five branches in the city and is raring to cover all
                  corners in the years to come. Meghana is proud to be a
                  favourite among all kinds of masses which range from corporate
                  people and college going students in the afternoons to
                  families and singletons at dinner time.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-6 mt-8">
                <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                  <span className="text-3xl block font-extrabold font-serif mb-4 text-gray-800">
                    10K
                  </span>
                  <h4 className="text-lg font-serif font-bold mb-1">
                    {t("common:about-listed-products-box-title")}
                  </h4>
                  <p className="mb-0 opacity-90 leading-7">
                    {t("common:about-listed-products-box-text")}
                  </p>
                </div>
                <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                  <span className="text-3xl block font-extrabold font-serif mb-4 text-gray-800">
                    8K
                  </span>
                  <h4 className="text-lg font-serif font-bold mb-1">
                    {t("common:about-customer-box-title")}
                  </h4>
                  <p className="mb-0 opacity-90 leading-7">
                    {t("common:about-customers-box-text")}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <Image
                width={920}
                height={750}
                src="https://res.cloudinary.com/djqex7eae/image/upload/v1713427026/wikmm8ojs65kzpzegc7e.png"
                alt="logo"
              />
            </div>
          </div>
          {/* <div className="mt-10 lg:mt-16 text-base opacity-90 leading-7">
            <p>{t("common:about-section-top-paragraph3")}</p>

            <p>{t("common:about-section-top-paragraph4")}</p>
          </div> */}

          <div className="relative">
            <Link href="/menu">
              <button
                data-variant="flat"
                className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-base w-full sm:w-auto"
                style={{
                  backgroundColor: "#fe0000",
                  width: "47%",
                  padding: "25px",
                  marginTop: "20px",
                }}
              >
                <FaUtensils />
                &nbsp;&nbsp;
                {t("Explore Menu")}
              </button>
            </Link>
          </div>
        </div>

        <div
          className="bg-gray-50 lg:py-20 py-10"
          id="process"
          style={{ height: "500px" }}
        >
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
            <div className="relative flex flex-col sm:flex-row sm:items-end justify-between mb-8">
              <div className="max-w-2xl">
                <h3 className="text-xl lg:text-3xl mb-2 font-serif font-semibold">
                  {/* {t("common:about-our-founder-title")} */}
                </h3>
                <p className="mt-2 md:mt-3 font-normal block text-base">
                  {/* {t("common:about-our-founder-paragraph")} */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="testimonial">
        <FullTestimonial />
       
      </div>
    </Layout>
  );
};

export default AboutUs;
