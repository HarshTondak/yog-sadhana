import { useRef, useState } from "react";
import ProfilePicture from "../../components/profilePicture";
import { useSelector } from "react-redux";

export default function ProfilePictureInfos({ photos }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [show, setShow] = useState(false);
  const pRef = useRef(null);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1

  return (
    <div className="profile_img_wrap">
      {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${user.picture})`,
            }}
          ></div>

          <div className="profile_circle hover1" onClick={() => setShow(true)}>
            <i className="camera_filled_icon"></i>
          </div>
        </div>

        <div className="profile_w_col">
          <div className="profile_name">@{user.username}</div>

          <div className="profile_friend_count"></div>

          <div className="profile_friend_imgs"></div>
        </div>
      </div>

      <div className="profile_w_right">
        <div className="blue_btn">
          <span>
            {user.sYear == year && user.sMonth == month
              ? "You have Membership for this Month"
              : "Please Activate your Membership"}
          </span>
        </div>
        <div className="gray_btn">
          <span onClick={() => alert("In Development Phase!!")}>
            Upgrade Plan
          </span>
        </div>
      </div>
    </div>
  );
}
