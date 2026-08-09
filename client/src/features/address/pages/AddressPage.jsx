import Container from "../../../components/ui/Container";

import AddressManager from "../components/AddressManager";

import "./AddressPage.css";

const AddressPage = () => {
  return (
    <Container>
      <div className="address-page">
        <header className="address-page__header">
          <div>
            <span className="address-page__eyebrow">ACCOUNT</span>

            <h1 className="address-page__title">My Addresses</h1>

            <p className="address-page__subtitle">
              Manage your saved delivery addresses.
            </p>
          </div>
        </header>

        <AddressManager mode="page" />
      </div>
    </Container>
  );
};

export default AddressPage;
