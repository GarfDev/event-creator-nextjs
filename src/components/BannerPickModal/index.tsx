import { default as BaseImage } from "next/image";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { BANNER_URLS } from "./constants";

interface Props {
  show: boolean;
  onClose: () => void;
  onSave: (banner: string) => void;
}

const BannerPickModal = ({ show, onClose, onSave }: Props) => {
  const [selectedBanner, setSelectedBanner] = useState<string>(null!);

  useEffect(() => {
    return () => setSelectedBanner(null!);
  }, []);

  return (
    <Modal size="xl" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Choose a Banner
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-wrap p-4 text-red">
        {BANNER_URLS.map((bannerUrl) => (
          <Image
            selected={bannerUrl === selectedBanner}
            onClick={setSelectedBanner.bind(this, bannerUrl)}
            className="mr-4 mb-4 cursor-pointer"
            key={bannerUrl}
            src={bannerUrl}
            alt="banner"
            width={250}
            height={300}
          />
        ))}
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={onClose} className="bg-gray-300 text-black hover:bg-gray-400">
          Close
        </Button>
        <Button
          onClick={onSave.bind(this, selectedBanner)}
          className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BannerPickModal;

export const Image = styled(BaseImage)<{ selected: boolean }>`
  outline: ${({ selected }) => (selected ? "solid var(--primary)" : "none")};
`;

export const Button = styled.button`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
`;
