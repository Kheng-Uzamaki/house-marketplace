import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";

import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination, } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Spinner from "./Spinner";

const Slider = () => {
  const [loading, setLoading] = useState(true);

  const [listing, setListing] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListing(listings);
      setLoading(false);
    };
    fetchListing();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (listing.length === 0) {
    return <></>;
  }
  return (
    listing && (
      <>
        <p className="exploreHeading">Recommended</p>

        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {listing.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                  height: "300px", // Adjust this height as needed
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ${data.discountedPrice ?? data.regularPrice}
                  {data.type === "rent" && "/ month"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default Slider;
