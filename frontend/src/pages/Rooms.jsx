import Footer from "../component/dashboard/Footer";
import NavbarComp from "../component/dashboard/NavbarComp";

const Rooms = () => {
  const roomsData = [
    {
      title: "Premium King Room",
      price: 99,
      details: [
        { label: "Size:", value: "30 ft" },
        { label: "Capacity:", value: "Max person 3" },
        { label: "Bed:", value: "King Beds" },
        { label: "Services:", value: "Wifi, Television, Bathroom, ..." },
        { label: "View:", value: "Sea View" },
      ],
      imageUrls: [
        "img/rooms/room-1.jpg",
        "img/rooms/room-2.jpg",
        "img/rooms/room-3.jpg",
        "img/rooms/room-4.jpg",
      ],
    },
    {
      title: "Deluxe Room",
      price: 200000,
      details: [
        { label: "Size:", value: "30 ft" },
        { label: "Capacity:", value: "Max person 3" },
        { label: "Bed:", value: "King Beds" },
        { label: "Services:", value: "Wifi, Television, Bathroom, ..." },
        { label: "View:", value: "Sea View" },
      ],
      imageUrls: [
        "img/rooms/room-2.jpg",
        "img/rooms/room-3.jpg",
        "img/rooms/room-4.jpg",
        "img/rooms/room-1.jpg",
      ],
    },
  ];

  const renderRoom = (room) => (
    <div className="col-lg-6 p-0" key={room.title}>
      <div className="room__pic__slider owl-carousel">
        {room.imageUrls.map((imageUrl) => (
          <div
            className="room__pic__item set-bg"
            style={{ backgroundImage: `url(${imageUrl})` }}
            data-setbg={imageUrl}
          />
        ))}
      </div>
      <div
        className={`room__text ${
          room.title === "Deluxe Room" ? "right__text" : ""
        }`}
      >
        <h3>{room.title}</h3>
        <h2>
          <sup>Rp.</sup>
          {room.price}
          <span>/day</span>
        </h2>
        <ul>
          {room.details.map((detail) => (
            <li key={`${room.title}-${detail.label}`}>
              <span>{detail.label}</span>
              {detail.value}
            </li>
          ))}
        </ul>
        <a href="#">View Details</a>
      </div>
    </div>
  );

  return (
    <div>
      <div
        className="breadcrumb-option set-bg"
        style={{ backgroundImage: `url(img/breadcrumb-bg.jpg)` }}
        data-setbg={`url(img/breadcrumb-bg.jpg)`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h1>Our Room</h1>
                <div className="breadcrumb__links">
                  <a href="/">Home</a>
                  <span>Rooms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="rooms spad">
        <div className="container">
          <div className="row">
            {roomsData.map((room) => renderRoom(room))}
            <div className="col-lg-12">
              <div className="pagination__number">
                <a href="1">1</a>
                <a href="2">2</a>
                <a href="#">
                  Next <span className="arrow_right"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
