import React from "react";

function AddressForm({ addressProps, setAddressProps }) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <div>
      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(ev) => setAddressProps("phone", ev.target.value)}
        />
      </div>

      <div>
        <label>Street Address</label>
        <input
          type="text"
          placeholder="Street address"
          value={streetAddress}
          onChange={(ev) => setAddressProps("streetAddress", ev.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <div>
          <label>postal Code</label>
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(ev) => setAddressProps("postalCode", ev.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProps("city", ev.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(ev) => setAddressProps("country", ev.target.value)}
      />
    </div>
  );
}

export default AddressForm;
