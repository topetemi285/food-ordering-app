"use client";
import { useState } from "react";
import UserProfile from "../../hooks/UserProfile";
import EditableImage from "../layout/EditableImage";
import AddressForm from "../layout/AddressForm";

function UserForm({ user, onSave }) {
  const [userName, setUsername] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || "");
  const { data: loggedInUserData } = UserProfile();

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }

  return (
    <div className="flex gap-2 items-start">
      <EditableImage link={image} setLink={setImage} />
      <form
        className="grow text-start"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            admin,
            phone,
            streetAddress,
            city,
            country,
            postalCode,
          })
        }
      >
        <div>
          <label>First and Last Name</label>
          <input
            type="text"
            placeholder="First and Last Name"
            value={userName}
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input type="email" disabled={true} value={user?.email} />
        </div>

        <AddressForm
          addressProps={{
            phone,
            streetAddress,
            city,
            country,
            postalCode,
          }}
          setAddressProps={handleAddressChange}
        />
        {loggedInUserData?.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                type="checkbox"
                id="adminCb"
                checked={admin}
                value={"1"}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserForm;
