import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Calendar } from "react-date-range";
import styled from "styled-components";

interface Props {
  onChange: (dateStr: string) => void;
  className?: string;
}

const DateInput = ({ onChange, className }: Props) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const innerOnChange = (date: Date) => {
    setDate(date);
    handleClose();
  };

  useEffect(() => {
    onChange(date.toISOString());
  }, [date]);

  return (
    <div className={className}>
      <Input className="h-11 px-3" onClick={handleShow} value={date.toDateString()} readOnly />

      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="flex py-5 justify-center items-center">
          <Calendar date={date} onChange={innerOnChange} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DateInput;

const Input = styled.input`

  :focus {
    outline: none;
  }
`;
