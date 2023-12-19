import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import "./style.css";
import ProfilePictureInfos from "./ProfilePictureInfos";
import Intro from "../../components/intro";
import "react-loading-skeleton/dist/skeleton.css";

export default function Profile() {
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [photos, setPhotos] = useState({});
  var userName = username === undefined ? user.username : username;

  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    getProfileImages();
  }, [userName]);

  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  const getProfileImages = async () => {
    try {
      const images = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/listImages`,
        { path, sort, max },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (mountedRef.current) {
        // Add this condition to check if the component is still mounted
        setPhotos(images.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <ProfilePictureInfos photos={photos.resources} />
        </div>
      </div>

      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <Intro />
          </div>
        </div>
      </div>
    </div>
  );
}
