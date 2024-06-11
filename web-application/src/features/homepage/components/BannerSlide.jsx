import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import photo1 from "../../../assets/images/17223314_tp202-techi-blogbanner-06-pf-s50.jpg";
import photo2 from "../../../assets/images/6993805_585.jpg";
import photo3 from "../../../assets/images/perfume-banner-design-template-e0681a33c8dae68510dfef525c8fe42d_screen.jpg";
import photo4 from "../../../assets/images/tender-womens-perfume-3d-realistic-vector-advertising-banner-poster-template_33099-1333.jpg";

export default function BannerSlide({ className }) {
  return (
    <>
      <Carousel
        className="w-[100%] "
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000} // ความเร็วในการเลื่อน (3000ms = 3 วินาที)
      >
        <div className={className}>
          <img src={photo1} alt="Banner 1" />
        </div>
        <div className={className}>
          <img src={photo2} alt="Banner 2" />
        </div>
        <div className={className}>
          <img src={photo3} alt="Banner 3" />
        </div>
        <div className={className}>
          <img src={photo4} alt="Banner 4" />
        </div>
      </Carousel>
    </>
  );
}
