import * as React from "react";
import { Zoom, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";

import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { RxCross2 } from "react-icons/rx";
import * as API from "../api";

export default function App() {
  const router = useRouter();
  const index = router.query.currentIndex;
  const defaultSlide = Number(index, 10);
  const { id } = router.query;
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    API.getProduct(id).then((response) => setData(response));
  }, []);
  console.log(data);

  return (
    index && (
      <React.Fragment>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            height: "100vh",
            background: "black",
          }}
          zoom={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          initialSlide={defaultSlide}
          modules={[Zoom, Navigation, Pagination]}
          className="mySwiper"
        >
          <style>{`.swiper-zoom-container>canvas, .swiper-zoom-container>img, .swiper-zoom-container>svg {
    width: 100%;
}`}</style>
          {!!data &&
            data.assets.map((asset, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container">
                  <img src={asset.url} />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </React.Fragment>
    )
  );
}
