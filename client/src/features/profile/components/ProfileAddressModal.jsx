import Modal from "../../../components/ui/Modal";
import AddressManager from "../../address/components/AddressManager";

const ProfileAddressModal = ({
    isOpen,
    onClose
}) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Manage Addresses"
            size="large"
        >
            <AddressManager mode="modal" />
        </Modal>
    );

};

export default ProfileAddressModal;