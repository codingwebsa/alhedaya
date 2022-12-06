import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Banner1 from "../assets/banner1.png";
import Banner2 from "../assets/banner2.png";
import Banner3 from "../assets/banner3.png";
import Banner4 from "../assets/banner4.png";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Banner = () => {
  return (
    <>
      <div className="my-4">
        <Carousel
          responsive={responsive}
          // removeArrowOnDeviceType={["tablet", "mobile"]}
          autoPlay
          swipeable
          infinite
          draggable
          arrows={false}
          autoPlaySpeed={5000}
        >
          <div className="mx-1 rounded-md overflow-hidden">
            <Image alt="banner1" src={Banner1} property="true" />
          </div>
          <div className="mx-1 rounded-md overflow-hidden">
            <Image alt="banner2" src={Banner2} property="true" />
          </div>
          <div className="mx-1 rounded-md overflow-hidden">
            <Image alt="banner3" src={Banner3} property="true" />
          </div>
          <div className="mx-1 rounded-md overflow-hidden">
            <Image alt="banner4" src={Banner4} property="true" />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
